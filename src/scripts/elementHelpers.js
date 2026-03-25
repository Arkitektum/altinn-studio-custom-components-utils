// Functions
import { hasValue } from "./dataHelpers";
import { isValidTagName } from "./validators";

/**
 * Appends an array of children to a parent element. If a child is an instance of HTMLElement,
 * it is appended using `appendChild`. Otherwise, the child is converted to a text node and
 * appended to the parent using `appendChild`.
 *
 * @param {HTMLElement} parent - The parent element to which the children will be appended.
 * @param {Array<HTMLElement|string>} children - An array of children to append. Each child can be
 * either an HTMLElement or a string.
 * @returns {HTMLElement} The parent element after appending the children.
 */
export function appendChildren(parent, children) {
    const filteredChildren = children.filter((child) => !!child);
    for (const child of filteredChildren) {
        if (child instanceof HTMLElement) {
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
 * @param {HTMLElement} element - The element on which to set the attributes.
 * @param {Object} attributes - An object containing key-value pairs of attributes to set.
 */
export function setAttributes(element, attributes) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Invalid element provided. Expected an instance of HTMLElement.");
    }
    if (!attributes || typeof attributes !== "object") {
        return;
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
 * @param {HTMLElement} element - The HTML element to which the styles will be applied.
 * @param {Object} style - An object containing CSS property-value pairs.
 */
export function addStyle(element, style) {
    if (!element || !(element instanceof HTMLElement)) {
        throw new Error("Invalid element provided. Expected an instance of HTMLElement.");
    }
    if (!style || typeof style !== "object") {
        return;
    }
    for (const key of Object.keys(style)) {
        element.style[key] = style[key];
    }
}

/**
 * Calculates the flex width percentage based on the provided grid configuration. The function normalizes the grid values for different breakpoints (xs, sm, md, lg, xl) and returns the minimum width percentage to ensure proper responsiveness.
 *
 * @param {Object} grid - The grid configuration object containing breakpoint values (xs, sm, md, lg, xl).
 * @returns {number} The calculated flex width percentage based on the grid configuration. If no grid is provided, it returns 100.
 */
export function calculateFlexWidth(grid) {
    if (grid) {
        const normalizeGridValue = (value, fallback) => {
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
 * Creates a container element with a nested form content element, applies flex and padding styles,
 * and sets the width based on the provided grid value.
 *
 * @param {HTMLElement} component - The component to be wrapped inside the container.
 * @param {Object} grid - The grid configuration object to determine the width.
 * @returns {HTMLDivElement} The styled container element containing the component.
 */
export function addContainerElement(component, grid) {
    const containerElement = document.createElement("div");
    const formContentElement = document.createElement("div");
    formContentElement.appendChild(component);
    containerElement.appendChild(formContentElement);

    const flexStyle = {
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
 * Creates a custom HTML element with the specified tag name and attributes.
 *
 * @param {string} tagName - The name of the HTML tag to create.
 * @param {Object} htmlAttributes - An object containing key-value pairs of attributes to set on the created element.
 * @throws {Error} Throws an error if the provided tag name is invalid.
 * @returns {HTMLElement} The created custom HTML element with the specified attributes.
 */
export function createCustomElement(tagName, htmlAttributes) {
    if (!isValidTagName(tagName)) {
        throw new Error(`Invalid tag name ${tagName}`);
    }
    const customFieldElement = document.createElement(tagName);
    setAttributes(customFieldElement, htmlAttributes);
    return customFieldElement;
}
