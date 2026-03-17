// Functions
import { hasValue } from "./dataHelpers";

// Constants
import { customElementTagNames } from "../constants/customElementTagNames";
import { validSizeValues } from "../constants/validSizeValues";

/**
 * Checks if the provided header size is valid.
 *
 * @param {string} size - The header size to validate.
 * @returns {boolean} Returns `true` if the size is valid, otherwise `false`.
 */
export function isValidHeaderSize(size) {
    return hasValue(size) && validSizeValues.includes(size.toLowerCase());
}

/**
 * Checks if the provided tag name is valid.
 *
 * @param {string} tagName - The tag name to validate.
 * @returns {boolean} True if the tag name is valid, false otherwise.
 */
export function isValidTagName(tagName) {
    const validTagNames = customElementTagNames;
    return validTagNames.includes(tagName);
}
