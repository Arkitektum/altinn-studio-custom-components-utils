/**
 * Retrieves the global text resources from the window object if available.
 *
 * @returns {Array} An array of text resources if `window.textResources` exists, otherwise an empty array.
 */
export function getTextResources() {
    return typeof globalThis !== "undefined" && globalThis.textResources ? globalThis.textResources : [];
}

/**
 * Retrieves the default text resources from the global scope.
 *
 * @returns {Array} An array of default text resources if available on `globalThis.defaultTextResources`, otherwise an empty array.
 */
export function getDefaultTextResources() {
    return typeof globalThis !== "undefined" && globalThis.defaultTextResources ? globalThis.defaultTextResources : [];
}

/**
 * Retrieves the text resource value associated with the given resource binding.
 * It first searches in the current text resources, and if not found, falls back to the default text resources.
 * If the resource is still not found, it returns the resourceBinding itself.
 *
 * @param {string} resourceBinding - The identifier for the text resource to retrieve.
 * @returns {string} The value of the text resource, or the resourceBinding if not found.
 */
export function getTextResourceFromResourceBinding(resourceBinding) {
    const textResources = getTextResources();
    let textResource = textResources?.resources?.find((resource) => resource.id === resourceBinding)?.value;
    if (textResource == null) {
        const defaultTextResources = getDefaultTextResources();
        textResource = defaultTextResources?.resources?.find((resource) => resource.id === resourceBinding)?.value;
    }
    return textResource ?? resourceBinding;
}

/**
 * Retrieves text resources from the given resource bindings object.
 *
 * Iterates over each key in the resourceBindings object and uses
 * getTextResourceFromResourceBinding to extract the corresponding text resource.
 *
 * @param {Object} resourceBindings - An object where each key maps to a resource binding.
 * @returns {Object} An object mapping each key to its corresponding text resource.
 */
export function getTextResourcesFromResourceBindings(resourceBindings) {
    const texts = {};
    for (const key of Object.keys(resourceBindings)) {
        texts[key] =
            typeof resourceBindings[key] === "object" && resourceBindings[key] !== null && !Array.isArray(resourceBindings[key])
                ? getTextResourcesFromResourceBindings(resourceBindings[key])
                : getTextResourceFromResourceBinding(resourceBindings[key]);
    }
    return texts;
}
