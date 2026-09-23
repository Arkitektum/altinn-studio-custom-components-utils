// Functions
import { hasValue } from "./dataHelpers.ts";

// Constants
import { customElementTagNames } from "../constants/customElementTagNames.ts";
import { validSizeValues } from "../constants/validSizeValues.ts";

/**
 * Whether the given header size is one a component may ask for.
 *
 * @param size - The header size to validate. Anything, since callers pass whatever a component declared.
 * @returns True when the size is valid, ignoring case.
 */
export function isValidHeaderSize(size: unknown): boolean {
    return hasValue(size) && validSizeValues.includes(String(size).toLowerCase());
}

/**
 * Whether the given tag name is one of the custom elements this ecosystem defines.
 *
 * @param tagName - The tag name to validate. Anything, for the same reason as above.
 * @returns True when the tag name is on the allow-list. Case-sensitive, since the tag names are.
 */
export function isValidTagName(tagName: unknown): boolean {
    return typeof tagName === "string" && customElementTagNames.includes(tagName);
}
