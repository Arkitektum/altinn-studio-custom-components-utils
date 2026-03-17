/**
 * Checks if the given object has at least one property with a non-empty value.
 * Uses the `hasValue` function to determine if a property's value is considered content.
 *
 * @param {Object} obj - The object to check for content.
 * @returns {boolean} Returns true if at least one property has content, otherwise false.
 */
function objectHasContent(obj) {
    for (let key in obj) {
        if (key !== "altinnRowId" && hasValue(obj[key])) {
            // Exclude altinnRowId from content check
            return true;
        }
    }
    return false;
}

/**
 * Checks if the given array contains at least one item that has a value.
 * Uses the `hasValue` function to determine if an item is considered to have content.
 *
 * @param {Array} arr - The array to check for content.
 * @returns {boolean} Returns true if at least one item in the array has content, otherwise false.
 */
function arrayHasContent(arr) {
    for (let item of arr) {
        if (hasValue(item)) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if the provided object has a meaningful value.
 *
 * Handles different types:
 * - `undefined` or `null`: returns false
 * - `string`: returns true if length > 0
 * - `number`: returns true if not NaN
 * - `boolean`: returns true if boolean
 * - `Array`: returns true if array has content (uses arrayHasContent)
 * - `Object`: returns true if object has content (uses objectHasContent)
 *
 * @param {*} obj - The object to check for value.
 * @returns {boolean} True if the object has a value, false otherwise.
 */
export function hasValue(obj) {
    if (obj === undefined || obj === null) {
        return false;
    }
    if (typeof obj === "string") {
        return obj.length > 0;
    }
    if (typeof obj === "number") {
        return !Number.isNaN(obj);
    }
    if (typeof obj === "boolean") {
        return typeof obj === "boolean";
    }
    if (Array.isArray(obj)) {
        if (obj.length > 0) {
            return arrayHasContent(obj);
        }
    }
    for (let key in obj) {
        if (obj?.[key]?.toString().length > 0 && key !== "altinnRowId") {
            // Exclude altinnRowId from content check
            return objectHasContent(obj);
        }
    }
    return false;
}
