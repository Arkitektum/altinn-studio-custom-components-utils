import {
    getDefaultTextResources,
    getTextResourceFromResourceBinding,
    getTextResources,
    getTextResourcesFromResourceBindings
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
        it("returns resourceBinding if not found anywhere", () => {
            globalThis.textResources = { resources: [] };
            globalThis.defaultTextResources = { resources: [] };
            expect(getTextResourceFromResourceBinding("notfound")).toBe("notfound");
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
    });
});
