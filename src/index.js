import CustomElementHtmlAttributes from "./classes/CustomElementHtmlAttributes.js";
export { CustomElementHtmlAttributes };

export { getDataForComponent, hasValue, getValueFromDataKey } from "./scripts/dataHelpers.ts";
export { addContainerElement, appendChildren, addStyle, calculateFlexWidth, createCustomElement, setAttributes } from "./scripts/elementHelpers.js";
export {
    getTextResources,
    getDefaultTextResources,
    getTextResourceFromResourceBinding,
    getTextResourcesFromResourceBindings
} from "./scripts/textResourcesHelpers.js";
export { isValidHeaderSize, isValidTagName } from "./scripts/validators.ts";
export { customElementTagNames } from "./constants/customElementTagNames.ts";
export { validSizeValues } from "./constants/validSizeValues.ts";
