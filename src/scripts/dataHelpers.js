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

/**
 * Retrieves a value from a nested data object based on a given data key.
 *
 * @param {Object} data - The data object to retrieve the value from.
 * @param {string} dataKey - The key representing the path to the value in the data object.
 *                           The key can be a dot-separated string or an array-like string with brackets.
 * @returns {*} - The value found at the specified data key path, or the original data if no data key is provided.
 */
export function getValueFromDataKey(data, dataKey) {
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
    return keys.reduce((acc, key) => acc?.[key], data);
}

/**
 * Retrieves data for a given component based on its data model bindings.
 *
 * @param {Object} component - The component object containing data model bindings.
 * @param {Array<Object>} [dataModels=[]] - Optional array of data model objects. Defaults to an empty array when omitted.
 * @param {string} [dataType] - Optional data type to filter the data models. If provided, the function will look for a data model with a matching `dataType` property.
 * @param {Object} [selectedFileNames] - Optional object mapping data types to selected file names. If provided, the function will attempt to retrieve data from the specified file for the matching data type.
 * @returns {Object} An object mapping each binding key to its corresponding data value.
 */
export function getDataForComponent(component, dataModels, dataType, selectedFileNames) {
    // Guard against a missing data-model list so callers that omit it (per the optional signature) don't crash on index/findIndex.
    if (!Array.isArray(dataModels)) {
        dataModels = [];
    }
    const data = {};
    component?.dataModelBindings &&
        Object.keys(component?.dataModelBindings).forEach((key) => {
            const dataModelBinding = component.dataModelBindings[key];
            if (typeof dataModelBinding === "string") {
                let index = 0;
                if (dataType) {
                    index = dataModels.findIndex((dataModel) => dataModel?.dataType === dataType);
                }
                const dataModel = selectedFileNames?.[dataType]?.length
                    ? dataModels[index]?.data?.[selectedFileNames[dataType]]
                    : dataModels[index]?.data;
                const dataModelData = getValueFromDataKey(dataModel, dataModelBinding);
                data[key] = dataModelData;
            } else if (typeof dataModelBinding === "object") {
                const index = dataModels.findIndex((dataModel) => dataModel?.dataType === dataModelBinding?.dataType);
                const dataModel = selectedFileNames?.[dataModelBinding?.dataType]?.length
                    ? dataModels[index]?.data?.[selectedFileNames[dataModelBinding?.dataType]]
                    : dataModels[index]?.data;
                const dataModelData = getValueFromDataKey(dataModel, dataModelBinding?.field);
                data[key] = dataModelData === undefined ? dataModelBinding?.data : dataModelData;
            }
        });
    return data;
}
