import CustomElementHtmlAttributes from "./classes/CustomElementHtmlAttributes.ts";
export { CustomElementHtmlAttributes };
export type { CustomElementProps } from "./classes/CustomElementHtmlAttributes.ts";

export { getDataForComponent, hasValue, getValueFromDataKey } from "./scripts/dataHelpers.ts";
export type { ComponentWithDataModelBindings, DataModel, DataModelBinding, SelectedFileNames } from "./scripts/dataHelpers.ts";
export { addContainerElement, appendChildren, addStyle, calculateFlexWidth, createCustomElement, setAttributes } from "./scripts/elementHelpers.ts";
export type { AppendableChild, Grid } from "./scripts/elementHelpers.ts";
export {
    getTextResources,
    getDefaultTextResources,
    getTextResourceFromResourceBinding,
    getTextResourcesFromResourceBindings
} from "./scripts/textResourcesHelpers.ts";
export type { TextResource, TextResourceCollection } from "./scripts/textResourcesHelpers.ts";
export { isValidHeaderSize, isValidTagName } from "./scripts/validators.ts";
export { customElementTagNames } from "./constants/customElementTagNames.ts";
export { validSizeValues } from "./constants/validSizeValues.ts";
