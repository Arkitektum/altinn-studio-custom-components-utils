import {
    getDefaultTextResources,
    getTextResourceFromResourceBinding,
    getTextResources,
    getTextResourcesFromResourceBindings,
    isPlainObject
} from "./textResourcesHelpers";

describe("textResourcesHelpers", () => {
    let originalTextResources;
    let originalDefaultTextResources;

    beforeEach(() => {
        originalTextResources = globalThis.textResources;
        originalDefaultTextResources = globalThis.defaultTextResources;
    });

    afterEach(() => {
        globalThis.textResources = originalTextResources;
        globalThis.defaultTextResources = originalDefaultTextResources;
    });

    describe("getTextResources", () => {
        it("returns textResources from globalThis if present", () => {
            globalThis.textResources = [1, 2, 3];
            expect(getTextResources()).toEqual([1, 2, 3]);
        });
        it("returns empty array if not present", () => {
            delete globalThis.textResources;
            expect(getTextResources()).toEqual([]);
        });
    });

    describe("getDefaultTextResources", () => {
        it("returns defaultTextResources from globalThis if present", () => {
            globalThis.defaultTextResources = [4, 5, 6];
            expect(getDefaultTextResources()).toEqual([4, 5, 6]);
        });
        it("returns empty array if not present", () => {
            delete globalThis.defaultTextResources;
            expect(getDefaultTextResources()).toEqual([]);
        });
    });

    describe("getTextResourceFromResourceBinding", () => {
        it("returns value from textResources if found", () => {
            globalThis.textResources = { resources: [{ id: "foo", value: "bar" }] };
            expect(getTextResourceFromResourceBinding("foo")).toBe("bar");
        });
        it("falls back to defaultTextResources if not found in textResources", () => {
            globalThis.textResources = { resources: [{ id: "foo", value: "bar" }] };
            globalThis.defaultTextResources = { resources: [{ id: "baz", value: "qux" }] };
            expect(getTextResourceFromResourceBinding("baz")).toBe("qux");
        });
        it("falls back to defaultTextResources if textResources is not set", () => {
            delete globalThis.textResources;
            globalThis.defaultTextResources = { resources: [{ id: "baz", value: "qux" }] };
            expect(getTextResourceFromResourceBinding("baz")).toBe("qux");
        });
        it("returns resourceBinding if not found anywhere", () => {
            globalThis.textResources = { resources: [] };
            globalThis.defaultTextResources = { resources: [] };
            expect(getTextResourceFromResourceBinding("notfound")).toBe("notfound");
        });
        it("returns resourceBinding if neither textResources nor defaultTextResources are set", () => {
            delete globalThis.textResources;
            delete globalThis.defaultTextResources;
            expect(getTextResourceFromResourceBinding("myKey")).toBe("myKey");
        });
    });

    describe("getTextResourcesFromResourceBindings", () => {
        beforeEach(() => {
            globalThis.textResources = {
                resources: [
                    { id: "foo", value: "bar" },
                    { id: "baz", value: "qux" }
                ]
            };
            globalThis.defaultTextResources = { resources: [{ id: "default", value: "fallback" }] };
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
