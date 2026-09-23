/** One form's data as the dashboard hands it over: which data type it is, and whatever the form data parsed to. */
export interface DataModel {
    dataType?: string;
    data?: unknown;
}

/**
 * Where a component reads one of its values from.
 *
 * A string is a path into the data model the caller names. An object names its own data type and field, and may
 * carry a value of its own to fall back on when the model has nothing at that field.
 */
export type DataModelBinding = string | { dataType?: string; field?: string; data?: unknown };

/** As much of a component as this module reads. */
export interface ComponentWithDataModelBindings {
    dataModelBindings?: Record<string, DataModelBinding>;
}

/** Which file of a data type the operator picked, when the model holds several. */
export type SelectedFileNames = Record<string, string | undefined>;

/**
 * Whether the given object has at least one property with a non-empty value.
 *
 * `altinnRowId` does not count. It is added to every row by Altinn rather than by anyone filling in a form, so a row
 * holding nothing else is empty as far as a reader is concerned.
 *
 * @param obj - The object to check for content.
 * @returns True when at least one property has content.
 */
function objectHasContent(obj: Record<string, unknown>): boolean {
    for (const key in obj) {
        if (key !== "altinnRowId" && hasValue(obj[key])) {
            return true;
        }
    }
    return false;
}

/**
 * Whether the given array holds at least one item with a value.
 *
 * @param arr - The array to check for content.
 * @returns True when at least one item has content.
 */
function arrayHasContent(arr: unknown[]): boolean {
    for (const item of arr) {
        if (hasValue(item)) {
            return true;
        }
    }
    return false;
}

/**
 * Whether the given value amounts to anything.
 *
 * Handles each type on its own terms: a string has value when it is not empty, a number when it is not NaN, a
 * boolean always, an array when one of its items has value, and an object when one of its properties does.
 *
 * @param obj - The value to check.
 * @returns True when the value amounts to something.
 */
export function hasValue(obj: unknown): boolean {
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
        return true;
    }
    if (Array.isArray(obj)) {
        return obj.length > 0 ? arrayHasContent(obj) : false;
    }
    // Anything that is not an object has been dealt with above, and cannot carry properties worth walking.
    if (typeof obj !== "object") {
        return false;
    }
    const record = obj as Record<string, unknown>;
    for (const key in record) {
        if (key !== "altinnRowId" && String(record[key] ?? "").length > 0) {
            return objectHasContent(record);
        }
    }
    return false;
}

/**
 * Reads a value out of nested data by path.
 *
 * @param data - The data to read from.
 * @param dataKey - The path to the value, dot-separated and accepting brackets, as in `b.d[1].e`.
 * @returns The value at that path, the data itself when no path was given, or undefined when the path leads nowhere.
 */
export function getValueFromDataKey(data: unknown, dataKey?: string): unknown {
    if (!dataKey) {
        return data;
    }
    if (data == null) {
        return undefined;
    }
    if (/(\.\.|^\.)/.test(dataKey)) {
        return undefined; // Invalid dataKey
    }
    const keys = dataKey.split(/[.[\]]/).filter(Boolean);
    let value: unknown = data;
    for (const key of keys) {
        value = (value as Record<string, unknown> | null | undefined)?.[key];
    }
    return value;
}

/**
 * The data of one model, or of the file selected within it when the operator picked one.
 *
 * @param dataModels - The models to read from.
 * @param index - Which model, as found by data type. Anything out of range reads as nothing.
 * @param dataType - The data type a file may have been selected for.
 * @param selectedFileNames - Which file was selected per data type, if any.
 * @returns The data to read the binding's path out of.
 */
function dataOfModel(dataModels: DataModel[], index: number, dataType?: string, selectedFileNames?: SelectedFileNames): unknown {
    const data = dataModels[index]?.data;
    const selectedFileName = dataType === undefined ? undefined : selectedFileNames?.[dataType];
    if (!selectedFileName?.length) {
        return data;
    }
    return (data as Record<string, unknown> | null | undefined)?.[selectedFileName];
}

/**
 * The data for one component, one value per binding it declares.
 *
 * @param component - The component whose bindings to read.
 * @param dataModels - The models to read from. Callers may omit it, so anything that is not a list reads as none.
 * @param dataType - Which data type to read a string binding from. Object bindings name their own.
 * @param selectedFileNames - Which file was selected per data type, if any.
 * @returns One entry per binding, keyed as the component keyed them.
 */
export function getDataForComponent(
    component?: ComponentWithDataModelBindings | null,
    dataModels?: DataModel[],
    dataType?: string,
    selectedFileNames?: SelectedFileNames
): Record<string, unknown> {
    // Guard against a missing data-model list so callers that omit it (per the optional signature) don't crash on index/findIndex.
    const models = Array.isArray(dataModels) ? dataModels : [];
    const data: Record<string, unknown> = {};
    const bindings = component?.dataModelBindings;
    if (bindings) {
        Object.keys(bindings).forEach((key) => {
            const dataModelBinding = bindings[key];
            if (typeof dataModelBinding === "string") {
                const index = dataType ? models.findIndex((dataModel) => dataModel?.dataType === dataType) : 0;
                data[key] = getValueFromDataKey(dataOfModel(models, index, dataType, selectedFileNames), dataModelBinding);
            } else if (typeof dataModelBinding === "object") {
                const index = models.findIndex((dataModel) => dataModel?.dataType === dataModelBinding?.dataType);
                const dataModelData = getValueFromDataKey(
                    dataOfModel(models, index, dataModelBinding?.dataType, selectedFileNames),
                    dataModelBinding?.field
                );
                data[key] = dataModelData === undefined ? dataModelBinding?.data : dataModelData;
            }
        });
    }
    return data;
}
