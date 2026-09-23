// Functions
import { hasValue } from "../scripts/dataHelpers.ts";
import { isValidHeaderSize } from "../scripts/validators.ts";


/**
 * Everything a component may hand to the attribute builder. Every one of them is optional, and each is read on its
 * own terms: some become the string "true", some are serialized as JSON, some are passed through.
 */
export interface CustomElementProps {
    isChildComponent?: unknown;
    formData?: unknown;
    tagName?: string;
    size?: string | number;
    hideTitle?: boolean | string;
    hideIfEmpty?: boolean | string;
    isEmpty?: unknown;
    inline?: unknown;
    styleOverride?: unknown;
    grid?: unknown;
    tableColumns?: unknown;
    itemKey?: string;
    itemTermKey?: string;
    itemDescriptionKey?: string;
    dataItemKey?: string;
    dataTitleItemKey?: string;
    id?: string;
    feedbackType?: string;
    hideOrgNr?: boolean | string;
    format?: string | number;
    showRowNumbers?: boolean | string;
    resourceBindings?: unknown;
    resourceValues?: unknown;
    enableLinks?: unknown;
    text?: string;
    order?: unknown;
}

/**
 * Class representing CustomElementHtmlAttributes.
 * @class
 */
export default class CustomElementHtmlAttributes {
    /**
     * The attributes, each set only when the props gave it a value.
     *
     * Declared rather than defined, so an instance carries only the attributes that were actually set. A plain field
     * declaration would define every one of them as undefined on construction, which changes what `Object.keys` sees.
     */
    declare isChildComponent?: string;
    declare formData?: string;
    declare tagName?: string;
    declare size?: string;
    declare hideTitle?: string;
    declare hideIfEmpty?: string;
    declare isEmpty?: string;
    declare inline?: string;
    declare styleOverride?: string;
    declare grid?: string;
    declare tableColumns?: string;
    declare itemKey?: string;
    declare itemTermKey?: string;
    declare itemDescriptionKey?: string;
    declare dataItemKey?: string;
    declare dataTitleItemKey?: string;
    declare id?: string;
    declare feedbackType?: string;
    declare hideOrgNr?: string;
    declare format?: string;
    declare showRowNumbers?: string;
    declare resourceBindings?: string;
    declare resourceValues?: string;
    declare enableLinks?: string;
    declare text?: string;
    declare order?: string;

    /**
     * Constructs a new instance of the CustomElementHtmlAttributes class.
     *
     * @param {Object} props - The properties object containing attributes for the custom element.
     * @param {boolean} [props.isChildComponent] - Indicates if the component is a child component.
     * @param {*} [props.formData] - The form data associated with the component.
     * @param {string} [props.tagName] - The tag name of the custom element.
     * @param {string} [props.size] - The size attribute of the component.
     * @param {boolean} [props.hideTitle] - Determines if the title should be hidden.
     * @param {boolean} [props.hideIfEmpty] - Determines if the component should be hidden when empty.
     * @param {boolean} [props.isEmpty] - Indicates if the component is empty.
     * @param {boolean} [props.inline] - Indicates if the component should be displayed inline.
     * @param {Object} [props.styleOverride] - Custom styles to override default styles.
     * @param {Object} [props.grid] - Grid configuration for the component.
     * @param {Array} [props.tableColumns] - An array of table column configurations.
     * @param {string} [props.itemKey] - A unique key for the item.
     * @param {string} [props.itemTermKey] - A key for the item term.
     * @param {string} [props.itemDescriptionKey] - A key for the item description.
     * @param {string} [props.id] - The ID of the component.
     * @param {string} [props.feedbackType] - The type of feedback associated with the component.
     * @param {boolean} [props.hideOrgNr] - Determines if the organization number should be hidden.
     * @param {string} [props.format] - The format attribute of the component.
     * @param {boolean} [props.showRowNumbers] - Indicates if row numbers should be shown.
     * @param {Object} [props.resourceBindings] - Text resource bindings for the component.
     * @param {Object} [props.resourceValues] - Resource values associated with the component.
     * @param {boolean} [props.enableLinks] - Indicates if links should be enabled in the component.
     * @param {string} [props.text] - The text content for the component.
     * @param {Object} [props.order] - The ordering configuration (e.g. sort key and direction) for the component.
     */
    constructor(props?: CustomElementProps) {
        const isChildComponent = this.getIsChildComponentAttributeFromProps(props);
        const formData = this.getFormDataAttributeFromProps(props);
        const tagName = this.getTagNameAttributeFromProps(props);
        const size = this.getSizeAttributeFromProps(props);
        const hideTitle = this.getHideTitleAttributeFromProps(props);
        const hideIfEmpty = this.getHideIfEmptyAttributeFromProps(props);
        const isEmpty = this.getIsEmptyAttributeFromProps(props);
        const inline = this.getInlineAttributeFromProps(props);
        const styleOverride = this.getStyleOverrideAttributeFromProps(props);
        const grid = this.getGridAttributeFromProps(props);
        const tableColumns = this.getTableColumnsAttributeFromProps(props);
        const itemKey = this.getItemKeyAttributeFromProps(props);
        const itemTermKey = this.getItemTermKeyAttributeFromProps(props);
        const itemDescriptionKey = this.getItemDescriptionKeyAttributeFromProps(props);
        const dataItemKey = this.getDataItemKeyAttributeFromProps(props);
        const dataTitleItemKey = this.getDataTitleItemKeyAttributeFromProps(props);
        const id = this.getIdAttributeFromProps(props);
        const feedbackType = this.getFeedbackTypeAttributeFromProps(props);
        const hideOrgNr = this.getHideOrgNrAttributeFromProps(props);
        const format = this.getFormatAttributeFromProps(props);
        const showRowNumbers = this.getShowRowNumbersAttributeFromProps(props);
        const resourceBindings = this.getResourceBindingsFromProps(props);
        const resourceValues = this.getResourceValuesFromProps(props);
        const enableLinks = this.getEnableLinksFromProps(props);
        const text = this.getTextAttributeFromProps(props);
        const order = this.getOrderAttributeFromProps(props);

        if (isChildComponent) {
            this.isChildComponent = isChildComponent;
        }
        if (formData) {
            this.formData = formData;
        }
        if (tagName) {
            this.tagName = tagName;
        }
        if (size) {
            this.size = size;
        }
        if (hideTitle) {
            this.hideTitle = hideTitle;
        }
        if (hideIfEmpty) {
            this.hideIfEmpty = hideIfEmpty;
        }
        if (isEmpty) {
            this.isEmpty = isEmpty;
        }
        if (inline) {
            this.inline = inline;
        }
        if (styleOverride) {
            this.styleOverride = styleOverride;
        }
        if (grid) {
            this.grid = grid;
        }
        if (tableColumns) {
            this.tableColumns = tableColumns;
        }
        if (itemKey) {
            this.itemKey = itemKey;
        }
        if (itemTermKey) {
            this.itemTermKey = itemTermKey;
        }
        if (itemDescriptionKey) {
            this.itemDescriptionKey = itemDescriptionKey;
        }
        if (dataItemKey) {
            this.dataItemKey = dataItemKey;
        }
        if (dataTitleItemKey) {
            this.dataTitleItemKey = dataTitleItemKey;
        }
        if (id) {
            this.id = id;
        }
        if (feedbackType) {
            this.feedbackType = feedbackType;
        }
        if (hideOrgNr) {
            this.hideOrgNr = hideOrgNr;
        }
        if (format) {
            this.format = format;
        }
        if (showRowNumbers) {
            this.showRowNumbers = showRowNumbers;
        }
        if (resourceBindings) {
            this.resourceBindings = resourceBindings;
        }
        if (resourceValues) {
            this.resourceValues = resourceValues;
        }
        if (enableLinks) {
            this.enableLinks = enableLinks;
        }
        if (text) {
            this.text = text;
        }
        if (order) {
            this.order = order;
        }
    }

    /**
     * Extracts and formats the `formData` attribute from the given props.
     * Converts the `formData` into a JSON string based on its type.
     *
     * A bare boolean is deliberately not serialized, even though `hasValue` accepts one. Boolean form data always
     * arrives inside an object (`formData.simpleBinding`), and the components package uses the `hasValue(x) && x`
     * idiom, which yields `false` for form data that is absent — serializing that would emit `formData="false"` and
     * make an empty component look populated.
     *
     * @param {Object} props - The properties object containing the `formData` attribute.
     * @param {string|number|Object} [props.formData] - The form data to be processed.
     * @returns {string|null} A JSON string representation of the `formData` if it exists and is valid, otherwise `null`.
     */
    getFormDataAttributeFromProps(props?: CustomElementProps): string | null {
        if (hasValue(props?.formData)) {
            if (typeof props?.formData === "string") {
                const formData = props?.formData;
                return JSON.stringify(formData);
            } else if (typeof props?.formData === "number") {
                const formData = props?.formData.toString();
                return JSON.stringify(formData);
            } else if (typeof props?.formData === "object") {
                // Stringify directly so arrays keep their array structure (a manual key copy would turn [1,2] into {"0":1,"1":2}).
                return JSON.stringify(props.formData);
            }
        }
        return null;
    }

    getIsChildComponentAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.isChildComponent ? "true" : null;
    }

    /**
     * Retrieves the `tagName` attribute from the provided props object.
     *
     * @param {Object} props - The props object containing attributes.
     * @param {string} [props.tagName] - The tagName attribute to retrieve.
     * @returns {string|null} The `tagName` as a string if it exists, otherwise `null`.
     */
    getTagNameAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.tagName ? props.tagName.toString() : null;
    }

    /**
     * If the size is valid, it returns the size as a string; otherwise, it returns null.
     *
     * @param {Object} props - The properties object containing the size attribute.
     * @param {string|number} [props.size] - The size value to validate and convert.
     * @returns {string|null} The size as a string if valid, otherwise null.
     */
    getSizeAttributeFromProps(props?: CustomElementProps): string | null {
        return isValidHeaderSize(props?.size) ? (props?.size?.toString().toLowerCase() as string) : null;
    }

    /**
     * Retrieves the "hideTitle" attribute from the provided props object.
     * Converts the "hideTitle" property to a string and checks if it equals "true".
     * If so, returns the string "true"; otherwise, returns null.
     *
     * @param {Object} props - The props object containing the "hideTitle" property.
     * @param {boolean|string} [props.hideTitle] - The property indicating whether the title should be hidden.
     * @returns {string|null} - Returns "true" if the "hideTitle" property is strictly equal to "true" as a string; otherwise, null.
     */
    getHideTitleAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.hideTitle?.toString() === "true" ? "true" : null;
    }

    /**
     * Retrieves the "hideIfEmpty" attribute from the provided props.
     *
     * @param {Object} props - The properties object to extract the attribute from.
     * @param {boolean|string} [props.hideIfEmpty] - A property that determines if the element should be hidden when empty.
     * @returns {string|null} - Returns the string "true" if the "hideIfEmpty" property is strictly equal to the string "true", otherwise returns `null`.
     */
    getHideIfEmptyAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.hideIfEmpty?.toString() === "true" ? "true" : null;
    }

    /**
     * Returns the string "true" if the `isEmpty` property in the given props is strictly equal to the string "true".
     * Otherwise, returns `null`.
     *
     * @param {Object} props - The props object that may contain the `isEmpty` property.
     * @param {*} [props.isEmpty] - The value to check for emptiness.
     * @returns {string|null} "true" if `props.isEmpty` is "true", otherwise `null`.
     */
    getIsEmptyAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.isEmpty?.toString() === "true" ? "true" : null;
    }

    /**
     * Retrieves the "inline" attribute from the provided props object.
     * Converts the "inline" property to a string and checks if it equals "true".
     * If so, returns the string "true"; otherwise, returns null.
     *
     * @param {Object} props - The properties object to extract the attribute from.
     * @param {any} props.inline - The "inline" property to evaluate.
     * @returns {string|null} - Returns "true" if the "inline" property is strictly equal to "true" as a string; otherwise, null.
     */
    getInlineAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.inline?.toString() === "true" ? "true" : null;
    }

    /**
     * Retrieves the style override attribute from the provided props.
     *
     * @param {Object} props - The properties object containing potential style overrides.
     * @param {Object} [props.styleOverride] - An object representing style overrides.
     * @returns {string|null} A JSON string representation of the styleOverride object if it exists and has a value, otherwise null.
     */
    getStyleOverrideAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.styleOverride) ? JSON.stringify(props?.styleOverride) : null;
    }

    /**
     * Retrieves the grid attribute from the provided props object.
     * If the `grid` property exists and has a value, it returns the JSON stringified version of it.
     * Otherwise, it returns `null`.
     *
     * @param {Object} props - The props object containing the grid attribute.
     * @param {Object} [props.grid] - The grid attribute to be processed.
     * @returns {string|null} The JSON stringified grid attribute if it exists, otherwise `null`.
     */
    getGridAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.grid) ? JSON.stringify(props?.grid) : null;
    }

    /**
     * Retrieves the `tableColumns` attribute from the provided props object.
     * If the `tableColumns` property exists and has a value, it returns the
     * JSON stringified version of the `tableColumns` property. Otherwise, it
     * returns `null`.
     *
     * @param {Object} props - The props object containing the `tableColumns` property.
     * @returns {string|null} The JSON stringified `tableColumns` if it exists and has a value, otherwise `null`.
     */
    getTableColumnsAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.tableColumns) ? JSON.stringify(props?.tableColumns) : null;
    }

    /**
     * Retrieves the `itemKey` attribute from the provided props if it has a valid value.
     *
     * @param {Object} props - The properties object to extract the `itemKey` from.
     * @param {*} props.itemKey - The key to be checked and returned if valid.
     * @returns {*} The value of `itemKey` if it exists and is valid; otherwise, returns `null`.
     */
    getItemKeyAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.itemKey) ? (props?.itemKey as string) : null;
    }

    /**
     * Retrieves the `itemTermKey` attribute from the given props if it has a value.
     *
     * @param {Object} props - The properties object to extract the attribute from.
     * @param {*} props.itemTermKey - The item term key to check and return.
     * @returns {string|null} The value of `itemTermKey` if it exists and has a value; otherwise, returns null.
     */
    getItemTermKeyAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.itemTermKey) ? (props?.itemTermKey as string) : null;
    }

    /**
     * Retrieves the 'itemDescriptionKey' attribute from the provided props object if it has a valid value.
     *
     * @param {Object} props - The properties object that may contain the 'itemDescriptionKey' attribute.
     * @returns {string|null} The value of 'itemDescriptionKey' if it exists and is valid; otherwise, returns null.
     */
    getItemDescriptionKeyAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.itemDescriptionKey) ? (props?.itemDescriptionKey as string) : null;
    }

    /**
     * Retrieves the `dataItemKey` attribute from the given props object if it has a value.
     *
     * @param {Object} props - The props object containing potential attributes.
     * @param {*} props.dataItemKey - The key to be retrieved if it has a value.
     * @returns {*} The value of `dataItemKey` if it exists and is valid; otherwise, returns null.
     */
    getDataItemKeyAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.dataItemKey) ? (props?.dataItemKey as string) : null;
    }

    /**
     * Retrieves the 'dataTitleItemKey' attribute from the given props if it has a value.
     *
     * @param {Object} props - The properties object to extract the attribute from.
     * @returns {string|null} The value of 'dataTitleItemKey' if it exists and is valid; otherwise, returns null.
     */
    getDataTitleItemKeyAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.dataTitleItemKey) ? (props?.dataTitleItemKey as string) : null;
    }

    /**
     * Retrieves the `id` attribute from the provided props object if it has a valid value.
     *
     * @param {Object} props - The props object containing potential attributes.
     * @param {string} [props.id] - The `id` attribute to be retrieved.
     * @returns {string|null} The `id` attribute if it has a valid value, otherwise `null`.
     */
    getIdAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.id) ? (props?.id as string) : null;
    }

    /**
     * Retrieves the feedback type attribute from the provided props.
     *
     * @param {Object} props - The properties object containing the feedbackType attribute.
     * @param {string} [props.feedbackType] - The feedback type to validate.
     * @returns {string|null} - Returns the feedback type if it is valid, "default" if invalid, or null if feedbackType is not provided.
     */
    getFeedbackTypeAttributeFromProps(props?: CustomElementProps): string | null {
        const validFeedbackTypes = ["error", "warning", "success", "info", "default"];
        if (hasValue(props?.feedbackType)) {
            return validFeedbackTypes.includes(props?.feedbackType as string) ? (props?.feedbackType as string) : "default";
        } else {
            return null;
        }
    }

    /**
     * Determines if the "hideOrgNr" property is set to the string "true".
     *
     * @param {Object} props - The properties object.
     * @param {boolean|string} [props.hideOrgNr] - The property indicating whether to hide the organization number.
     * @returns {string|null} Returns the string "true" if the "hideOrgNr" property is strictly equal to "true", otherwise null.
     */
    getHideOrgNrAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.hideOrgNr?.toString() === "true" ? "true" : null;
    }

    /**
     * Retrieves the 'format' attribute from the provided props object.
     *
     * @param {Object} props - The properties object containing the 'format' attribute.
     * @param {string|number|boolean|null|undefined} [props.format] - The format value to be retrieved.
     * @returns {string|null} - The string representation of the 'format' attribute if it exists and has a value; otherwise, null.
     */
    getFormatAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.format) ? (props?.format?.toString() as string) : null;
    }

    /**
     * Retrieves the "showRowNumbers" attribute from the provided props.
     * Converts the value to a string and checks if it equals "true".
     * Returns "true" if the condition is met, otherwise returns null.
     *
     * @param {Object} props - The properties object containing the "showRowNumbers" attribute.
     * @param {boolean|string} [props.showRowNumbers] - The value of the "showRowNumbers" attribute.
     * @returns {string|null} - Returns "true" if the "showRowNumbers" attribute is strictly equal to "true" as a string, otherwise null.
     */
    getShowRowNumbersAttributeFromProps(props?: CustomElementProps): string | null {
        return props?.showRowNumbers?.toString() === "true" ? "true" : null;
    }

    /**
     * Retrieves the text resource bindings from the given props object.
     * If the `resourceBindings` property exists and has a value, it returns its JSON string representation.
     * Otherwise, returns null.
     *
     * @param {Object} props - The properties object that may contain text resource bindings.
     * @returns {string|null} The JSON stringified text resource bindings if present, otherwise null.
     */
    getResourceBindingsFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.resourceBindings) ? JSON.stringify(props?.resourceBindings) : null;
    }

    /**
     * Retrieves the resource values from the provided props object.
     *
     * @param {Object} props - The properties object that may contain resource values.
     * @param {*} [props.resourceValues] - The resource values to retrieve.
     * @returns {string|null} The JSON stringified resource values if present and valid; otherwise, returns null.
     */
    getResourceValuesFromProps(props?: CustomElementProps): string | null {
        if (hasValue(props?.resourceValues)) {
            return JSON.stringify(props?.resourceValues);
        } else {
            return null;
        }
    }

    /**
     * Determines if the 'enableLinks' property in the given props is set to "true".
     *
     * @param {Object} props - The properties object to check.
     * @param {*} [props.enableLinks] - The value indicating whether links should be enabled.
     * @returns {string|null} Returns "true" if 'enableLinks' is strictly "true", otherwise null.
     */
    getEnableLinksFromProps(props?: CustomElementProps): string | null {
        return props?.enableLinks?.toString() === "true" ? "true" : null;
    }

    /**
     * Retrieves the 'text' attribute from the given props object if it has a value.
     *
     * @param {Object} props - The properties object that may contain a 'text' attribute.
     * @returns {*} The value of 'props.text' if it exists and passes the hasValue check; otherwise, returns null.
     */
    getTextAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.text) ? (props?.text as string) : null;
    }

    /**
     * Retrieves the 'order' attribute from the provided props object if it has a value.
     *
     * @param {Object} props - The properties object that may contain an 'order' attribute.
     * @returns {string|null} The JSON-stringified value of 'order' if it exists and passes the hasValue check; otherwise, null.
     */
    getOrderAttributeFromProps(props?: CustomElementProps): string | null {
        return hasValue(props?.order) ? JSON.stringify(props?.order) : null;
    }
}
