// Functions
import { hasValue } from "./dataHelpers.ts";
import { isValidTagName } from "./validators.ts";

/** How wide a component asks to be at each breakpoint, in twelfths. Values arrive from a layout file, so they are not necessarily numbers. */
export interface Grid {
    xs?: unknown;
    sm?: unknown;
    md?: unknown;
    lg?: unknown;
    xl?: unknown;
}

/** Anything a caller may pass as a child. Falsy values are skipped, so the result of a conditional can be passed straight in. */
export type AppendableChild = Node | string | number | null | undefined | false;

/**
 * Appends an array of children to a parent element. A child that is already a DOM node is appended as-is;
 * anything else is stringified into a text node. Falsy children are skipped, so callers can pass the result of a
 * conditional directly.
 *
 * The check is against `Node` rather than `HTMLElement` so that text nodes, SVG elements, fragments and comments
 * are appended rather than stringified: `HTMLElement` would turn a text node into the literal "[object Text]".
 *
 * @param parent - The parent element to which the children will be appended.
 * @param children - The children to append, each a DOM node or a value to render as text.
 * @returns The parent element after appending the children.
 */
export function appendChildren(parent: HTMLElement, children: AppendableChild[]): HTMLElement {
    const filteredChildren = children.filter((child) => !!child);
    for (const child of filteredChildren) {
        if (child instanceof Node) {
            parent.appendChild(child);
        } else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
    return parent;
}

/**
 * Sets multiple attributes on a given HTML element.
 *
 * The element is taken as unknown because callers pass whatever they have: nothing at all is ignored, and something
 * that is not an element is a mistake worth reporting rather than working around.
 *
 * @param element - The element on which to set the attributes.
 * @param attributes - Key-value pairs of attributes to set. Null and undefined values are skipped.
 * @throws If something that is not an HTMLElement is passed.
 */
export function setAttributes(element: unknown, attributes: unknown): void {
    if (!element || !attributes || typeof attributes !== "object") {
        return;
    }
    if (!(element instanceof HTMLElement)) {
        throw new Error("Invalid element provided. Expected an instance of HTMLElement.");
    }
    for (const [key, value] of Object.entries(attributes)) {
        if (value === null || value === undefined) {
            continue;
        }
        element.setAttribute(key, String(value));
    }
}

/**
 * Adds the specified styles to the given HTML element.
 *
 * @param element - The element to which the styles will be applied.
 * @param style - CSS property-value pairs, named as the style object names them.
 * @throws If something that is not an HTMLElement is passed.
 */
export function addStyle(element: unknown, style: unknown): void {
    if (!element || !style || typeof style !== "object") {
        return;
    }
    if (!(element instanceof HTMLElement)) {
        throw new Error("Invalid element provided. Expected an instance of HTMLElement.");
    }
    const styleProperties = style as Record<string, string>;
    const elementStyle = element.style as unknown as Record<string, string>;
    for (const key of Object.keys(styleProperties)) {
        elementStyle[key] = styleProperties[key];
    }
}

/**
 * The flex width percentage for a grid configuration.
 *
 * Each breakpoint falls back to the one below it, so a grid naming only `xs` is that width all the way up. The
 * narrowest of them wins, which is what keeps a component from overflowing its row at any size.
 *
 * @param grid - The grid configuration, by breakpoint.
 * @returns The width percentage, or 100 when there is no grid to go on.
 */
export function calculateFlexWidth(grid?: Grid | null): number {
    if (grid) {
        const normalizeGridValue = (value: unknown, fallback: number): number => {
            if (value === null || value === undefined) {
                return fallback;
            }
            const numeric = Number(value);
            return Number.isNaN(numeric) ? fallback : numeric;
        };

        const xs = normalizeGridValue(grid.xs, 12);
        const sm = normalizeGridValue(grid.sm, xs);
        const md = normalizeGridValue(grid.md, sm);
        const lg = normalizeGridValue(grid.lg, md);
        const xl = normalizeGridValue(grid.xl, lg);
        const widths = [xs, sm, md, lg, xl].map((value) => (value / 12) * 100);

        return Math.min(...widths);
    } else {
        return 100;
    }
}

/**
 * Wraps a component in a container that carries its width, so a row of components lays out as the grid asks.
 *
 * @param component - The component to wrap.
 * @param grid - The grid configuration deciding the width. Without one the container takes the full width.
 * @returns The container holding the component.
 */
export function addContainerElement(component: HTMLElement, grid?: Grid | null): HTMLDivElement {
    const containerElement = document.createElement("div");
    containerElement.setAttribute("data-summary-target", component.id);
    const formContentElement = document.createElement("div");
    formContentElement.appendChild(component);
    containerElement.appendChild(formContentElement);

    const flexStyle: Record<string, string> = {
        flexBasis: "100%",
        maxWidth: "100%"
    };

    if (hasValue(grid)) {
        const flexWidth = calculateFlexWidth(grid);
        flexStyle.flexBasis = `${flexWidth}%`;
        flexStyle.maxWidth = `${flexWidth}%`;
        flexStyle.flexGrow = "0";
    }

    addStyle(containerElement, {
        ...flexStyle,
        padding: "0.75rem 0px"
    });

    return containerElement;
}

/**
 * Creates a custom element with the given tag name and attributes.
 *
 * @param tagName - The tag name to create, which must be one this ecosystem defines.
 * @param htmlAttributes - Attributes to set on the created element. Typed as a plain object rather than a
 *   Record, because callers pass a CustomElementHtmlAttributes instance and a class has no index signature.
 * @throws If the tag name is not on the allow-list.
 * @returns The created element.
 */
export function createCustomElement(tagName: string, htmlAttributes?: object): HTMLElement {
    if (!isValidTagName(tagName)) {
        throw new Error(`Invalid tag name ${tagName}`);
    }
    const customFieldElement = document.createElement(tagName);
    setAttributes(customFieldElement, { ...htmlAttributes, tagName });
    return customFieldElement;
}
