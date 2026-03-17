// Functions
import { hasValue } from "./dataHelpers";

// Constants
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
