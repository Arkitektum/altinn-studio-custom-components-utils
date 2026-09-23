import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import {
    getDefaultTextResources,
    getTextResourceFromResourceBinding,
    getTextResources,
    getTextResourcesFromResourceBindings,
    isPlainObject
} from "./textResourcesHelpers.ts";

/** The two globals the app sets before the components render, which these tests move about. */
const testGlobals = globalThis as { textResources?: unknown; defaultTextResources?: unknown };

describe("textResourcesHelpers", () => {
    let originalTextResources: unknown;
    let originalDefaultTextResources: unknown;

    beforeEach(() => {
        originalTextResources = testGlobals.textResources;
        originalDefaultTextResources = testGlobals.defaultTextResources;
    });

    afterEach(() => {
        testGlobals.textResources = originalTextResources;
        testGlobals.defaultTextResources = originalDefaultTextResources;
    });

    describe("getTextResources", () => {
        it("returns textResources from globalThis if present", () => {
            testGlobals.textResources = [1, 2, 3];
            expect(getTextResources()).toEqual([1, 2, 3]);
        });
        it("returns empty array if not present", () => {
            delete testGlobals.textResources;
            expect(getTextResources()).toEqual([]);
        });
    });

    describe("getDefaultTextResources", () => {
        it("returns defaultTextResources from globalThis if present", () => {
            testGlobals.defaultTextResources = [4, 5, 6];
            expect(getDefaultTextResources()).toEqual([4, 5, 6]);
        });
        it("returns empty array if not present", () => {
            delete testGlobals.defaultTextResources;
            expect(getDefaultTextResources()).toEqual([]);
        });
    });

    describe("getTextResourceFromResourceBinding", () => {
        it("returns value from textResources if found", () => {
            testGlobals.textResources = { resources: [{ id: "foo", value: "bar" }] };
            expect(getTextResourceFromResourceBinding("foo")).toBe("bar");
        });
        it("falls back to defaultTextResources if not found in textResources", () => {
            testGlobals.textResources = { resources: [{ id: "foo", value: "bar" }] };
            testGlobals.defaultTextResources = { resources: [{ id: "baz", value: "qux" }] };
            expect(getTextResourceFromResourceBinding("baz")).toBe("qux");
        });
        it("falls back to defaultTextResources if textResources is not set", () => {
            delete testGlobals.textResources;
            testGlobals.defaultTextResources = { resources: [{ id: "baz", value: "qux" }] };
            expect(getTextResourceFromResourceBinding("baz")).toBe("qux");
        });
        it("returns resourceBinding if not found anywhere", () => {
            testGlobals.textResources = { resources: [] };
            testGlobals.defaultTextResources = { resources: [] };
            expect(getTextResourceFromResourceBinding("notfound")).toBe("notfound");
        });
        it("returns resourceBinding if neither textResources nor defaultTextResources are set", () => {
            delete testGlobals.textResources;
            delete testGlobals.defaultTextResources;
            expect(getTextResourceFromResourceBinding("myKey")).toBe("myKey");
        });
    });

    describe("getTextResourcesFromResourceBindings", () => {
        beforeEach(() => {
            testGlobals.textResources = {
                resources: [
                    { id: "foo", value: "bar" },
                    { id: "baz", value: "qux" }
                ]
            };
            testGlobals.defaultTextResources = { resources: [{ id: "default", value: "fallback" }] };
        });
        it("maps resourceBindings to text resources", () => {
            const bindings = { a: "foo", b: "baz", c: "notfound" };
            expect(getTextResourcesFromResourceBindings(bindings)).toEqual({ a: "bar", b: "qux", c: "notfound" });
        });
        it("handles nested resourceBindings objects", () => {
            const bindings = { a: "foo", nested: { b: "baz", c: "default" } };
            expect(getTextResourcesFromResourceBindings(bindings)).toEqual({ a: "bar", nested: { b: "qux", c: "fallback" } });
        });
        it("returns empty object for empty bindings", () => {
            expect(getTextResourcesFromResourceBindings({})).toEqual({});
        });
        it("returns an empty object when there are no bindings at all", () => {
            // Resource bindings are optional, so a missing value must not throw: the TypeError would escape the
            // component constructor and abort the render.
            expect(getTextResourcesFromResourceBindings(undefined)).toEqual({});
            expect(getTextResourcesFromResourceBindings(null)).toEqual({});
        });
        it("returns an empty object for non-object bindings instead of walking them", () => {
            // A bare Object.keys("ab") would yield { 0: "a", 1: "b" }.
            expect(getTextResourcesFromResourceBindings("foo")).toEqual({});
            expect(getTextResourcesFromResourceBindings(42)).toEqual({});
            expect(getTextResourcesFromResourceBindings(["foo"])).toEqual({});
        });
        it("keeps nested bindings working when a nested value is absent", () => {
            const bindings = { a: "foo", nested: { b: "baz" } };
            expect(getTextResourcesFromResourceBindings(bindings)).toEqual({ a: "bar", nested: { b: "qux" } });
        });
    });

    describe("isPlainObject", () => {
        it("returns true for plain objects", () => {
            expect(isPlainObject({})).toBe(true);
            expect(isPlainObject({ a: 1 })).toBe(true);
        });
        it("returns false for null", () => {
            expect(isPlainObject(null)).toBe(false);
        });
        it("returns false for arrays", () => {
            expect(isPlainObject([])).toBe(false);
            expect(isPlainObject([1, 2])).toBe(false);
        });
        it("returns false for primitives", () => {
            expect(isPlainObject("string")).toBe(false);
            expect(isPlainObject(42)).toBe(false);
            expect(isPlainObject(true)).toBe(false);
            expect(isPlainObject(undefined)).toBe(false);
        });
    });
});
