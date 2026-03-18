import CustomElementHtmlAttributes from "./classes/CustomElementHtmlAttributes";
export { CustomElementHtmlAttributes };

export { getDataForComponent, hasValue, getValueFromDataKey } from "./scripts/dataHelpers.js";
export { addContainerElement, appendChildren, addStyle, calculateFlexWidth, createCustomElement, setAttributes } from "./scripts/elementHelpers.js";
export {
    getTextResources,
    getDefaultTextResources,
    getTextResourceFromResourceBinding,
    getTextResourcesFromResourceBindings
} from "./scripts/textResourcesHelpers.js";
export { isValidHeaderSize, isValidTagName } from "./scripts/validators.js";
