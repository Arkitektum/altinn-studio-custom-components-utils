/** One text resource: the id a binding names, and the text to show for it. */
export interface TextResource {
    id: string;
    value: string;
}

/** A set of text resources, as the app puts it on the global scope. */
export interface TextResourceCollection {
    resources?: TextResource[];
}

/**
 * The globals the app sets before the components render.
 *
 * Read through a cast rather than declared with `declare global`, which would put these names into the global scope
 * of everything that depends on this package and collide with any other declaration of them.
 */
function globalTextResources(): { textResources?: unknown; defaultTextResources?: unknown } {
    return globalThis as { textResources?: unknown; defaultTextResources?: unknown };
}

/**
 * The text resources the app is running with.
 *
 * @returns Whatever the app put on `globalThis.textResources`, or an empty array when it set nothing.
 */
export function getTextResources(): unknown {
    return typeof globalThis !== "undefined" && globalTextResources().textResources ? globalTextResources().textResources : [];
}

/**
 * The text resources to fall back on.
 *
 * @returns Whatever the app put on `globalThis.defaultTextResources`, or an empty array when it set nothing.
 */
export function getDefaultTextResources(): unknown {
    return typeof globalThis !== "undefined" && globalTextResources().defaultTextResources ? globalTextResources().defaultTextResources : [];
}

/**
 * The text for one resource binding.
 *
 * The app's own resources are searched first, then the defaults that ship with the components. A binding nothing
 * answers to comes back as itself, which is what puts the missing id on screen instead of an empty space.
 *
 * @param resourceBinding - The id of the text resource to look up.
 * @returns The text, or the binding itself when neither set has it.
 */
export function getTextResourceFromResourceBinding(resourceBinding: string): string {
    const textResources = getTextResources() as TextResourceCollection | undefined;
    const defaultTextResources = getDefaultTextResources() as TextResourceCollection | undefined;
    return (
        textResources?.resources?.find((resource) => resource.id === resourceBinding)?.value ??
        defaultTextResources?.resources?.find((resource) => resource.id === resourceBinding)?.value ??
        resourceBinding
    );
}

/**
 * Whether a value is a plain object, meaning neither null nor an array.
 *
 * @param value - The value to check.
 * @returns True when the value is a plain object.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * The texts for a set of resource bindings, keyed as the bindings were, and nested where they nest.
 *
 * Resource bindings are optional throughout the component classes, so anything that is not a plain object, most
 * commonly `undefined` for a component or data item without bindings, yields an empty result. A bare `Object.keys`
 * would throw a TypeError instead, and that throw escapes the component constructor and aborts the whole render.
 * Rejecting non-objects also stops a stray string from being walked per character, turning `"ab"` into
 * `{0: "a", 1: "b"}`.
 *
 * @param resourceBindings - The bindings to look up, which may nest.
 * @returns One text per binding, or an empty object when there are no bindings to speak of.
 */
export function getTextResourcesFromResourceBindings(resourceBindings?: unknown): Record<string, unknown> {
    if (!isPlainObject(resourceBindings)) {
        return {};
    }
    const texts: Record<string, unknown> = {};
    for (const key of Object.keys(resourceBindings)) {
        const binding = resourceBindings[key];
        texts[key] = isPlainObject(binding) ? getTextResourcesFromResourceBindings(binding) : getTextResourceFromResourceBinding(binding as string);
    }
    return texts;
}
