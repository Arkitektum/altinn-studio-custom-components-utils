import { describe, expect, it } from "@jest/globals";
import { isValidHeaderSize, isValidTagName } from "../scripts/validators.ts";
import { customElementTagNames } from "./customElementTagNames.ts";
import { validSizeValues } from "./validSizeValues.ts";

describe("the allow-lists", () => {
    it("cannot be added to, so a consumer cannot let another tag through", () => {
        expect(() => (customElementTagNames as string[]).push("iframe")).toThrow(TypeError);
        expect(() => {
            (customElementTagNames as string[])[0] = "script";
        }).toThrow(TypeError);
        expect(isValidTagName("iframe")).toBe(false);
        expect(isValidTagName("script")).toBe(false);
    });

    it("cannot be added to for heading sizes either", () => {
        expect(() => (validSizeValues as string[]).push("div")).toThrow(TypeError);
        expect(isValidHeaderSize("div")).toBe(false);
    });

    it("still answers for the entries they hold", () => {
        expect(isValidTagName("custom-field")).toBe(true);
        expect(isValidHeaderSize("h2")).toBe(true);
    });
});
