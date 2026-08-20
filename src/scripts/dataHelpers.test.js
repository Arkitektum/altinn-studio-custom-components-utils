import { getDataForComponent, getValueFromDataKey, hasValue } from "./dataHelpers.js";

describe("dataHelpers", () => {
    describe("hasValue", () => {
        it("returns false for undefined or null", () => {
            expect(hasValue(undefined)).toBe(false);
            expect(hasValue(null)).toBe(false);
        });
        it("returns true for non-empty string, false for empty string", () => {
            expect(hasValue("foo")).toBe(true);
            expect(hasValue("")).toBe(false);
        });
        it("returns true for numbers except NaN", () => {
            expect(hasValue(123)).toBe(true);
            expect(hasValue(0)).toBe(true);
            expect(hasValue(Number.NaN)).toBe(false);
        });
        it("returns true for booleans", () => {
            expect(hasValue(true)).toBe(true);
            expect(hasValue(false)).toBe(true);
        });
        it("returns true for arrays with at least one value", () => {
            expect(hasValue([null, "foo"])).toBe(true);
            expect(hasValue([undefined, false, 0, ""])).toBe(true);
            expect(hasValue([null, undefined, ""])).toBe(false);
            expect(hasValue([])).toBe(false);
        });
        it("returns true for objects with at least one value", () => {
            expect(hasValue({ a: "foo" })).toBe(true);
            expect(hasValue({ a: null, b: undefined })).toBe(false);
            expect(hasValue({ altinnRowId: "123" })).toBe(false);
            expect(hasValue({ a: "", b: 0 })).toBe(true);
        });
        it("returns false for empty objects and objects with only empty string values", () => {
            expect(hasValue({})).toBe(false);
            expect(hasValue({ a: "" })).toBe(false);
        });
    });

    describe("getValueFromDataKey", () => {
        const data = {
            a: 1,
            b: { c: 2, d: [3, { e: 4 }] },
            arr: [10, 20, 30]
        };
        it("returns data if no dataKey", () => {
            expect(getValueFromDataKey(data)).toBe(data);
        });
        it("returns undefined for null data", () => {
            expect(getValueFromDataKey(null, "a")).toBeUndefined();
        });
        it("returns undefined for invalid dataKey", () => {
            expect(getValueFromDataKey(data, ".a")).toBeUndefined();
            expect(getValueFromDataKey(data, "..a")).toBeUndefined();
        });
        it("retrieves nested values with dot/bracket notation", () => {
            expect(getValueFromDataKey(data, "a")).toBe(1);
            expect(getValueFromDataKey(data, "b.c")).toBe(2);
            expect(getValueFromDataKey(data, "b.d[1].e")).toBe(4);
            expect(getValueFromDataKey(data, "arr[2]")).toBe(30);
        });
        it("returns data for empty string dataKey", () => {
            expect(getValueFromDataKey(data, "")).toBe(data);
        });
        it("returns undefined for undefined data with a key", () => {
            expect(getValueFromDataKey(undefined, "a")).toBeUndefined();
        });
        it("returns undefined for non-existent key", () => {
            expect(getValueFromDataKey(data, "nonExistent")).toBeUndefined();
        });
    });

    describe("getDataForComponent", () => {
        const dataModels = [
            { dataType: "type1", data: { foo: 1, bar: { baz: 2 } } },
            { dataType: "type2", data: { alpha: 3 } }
        ];
        it("maps dataModelBindings to values (string)", () => {
            const component = { dataModelBindings: { a: "foo", b: "bar.baz" } };
            expect(getDataForComponent(component, dataModels, "type1")).toEqual({ a: 1, b: 2 });
        });
        it("maps dataModelBindings to values (object)", () => {
            const component = { dataModelBindings: { a: { dataType: "type2", field: "alpha" } } };
            expect(getDataForComponent(component, dataModels)).toEqual({ a: 3 });
        });
        it("returns binding data if not found in model", () => {
            const component = { dataModelBindings: { a: { dataType: "type2", field: "notfound", data: 42 } } };
            expect(getDataForComponent(component, dataModels)).toEqual({ a: 42 });
        });
        it("uses selectedFileNames if provided", () => {
            const dataModelsWithFiles = [{ dataType: "type1", data: { fileA: { foo: 10 }, fileB: { foo: 20 } } }];
            const component = { dataModelBindings: { a: "foo" } };
            const selectedFileNames = { type1: "fileB" };
            expect(getDataForComponent(component, dataModelsWithFiles, "type1", selectedFileNames)).toEqual({ a: 20 });
        });
        it("returns empty object if no dataModelBindings", () => {
            expect(getDataForComponent({}, dataModels)).toEqual({});
        });
        it("returns empty object for null or undefined component", () => {
            expect(getDataForComponent(null, dataModels)).toEqual({});
            expect(getDataForComponent(undefined, dataModels)).toEqual({});
        });
        it("falls back to binding data if dataType not found in models (object binding)", () => {
            const component = { dataModelBindings: { a: { dataType: "notFound", field: "foo", data: 99 } } };
            expect(getDataForComponent(component, dataModels)).toEqual({ a: 99 });
        });
    });
});
