import CustomElementHtmlAttributes from "./CustomElementHtmlAttributes";
import { hasValue } from "../scripts/dataHelpers.js";
import { isValidHeaderSize } from "../scripts/validators.js";

// Mock the imported helpers
jest.mock("../scripts/validators.js", () => ({
    isValidHeaderSize: jest.fn((size) => ["h1", "h2", "h3", "h4", "h5", "h6"].includes((size || "").toLowerCase()))
}));
jest.mock("../scripts/dataHelpers.js", () => ({
    hasValue: jest.fn((val) => val !== undefined && val !== null && val !== "")
}));

describe("CustomElementHtmlAttributes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default hasValue to real implementation for most tests
        hasValue.mockImplementation((val) => val !== undefined && val !== null && val !== "");
    });

    describe("constructor", () => {
        it("should set all attributes if provided in props", () => {
            isValidHeaderSize.mockReturnValue(true);
            const props = {
                isChildComponent: true,
                formData: { foo: "bar" },
                tagName: "custom-tag",
                size: "h2",
                hideTitle: true,
                hideIfEmpty: true,
                isEmpty: true,
                inline: true,
                styleOverride: { color: "red" },
                grid: { xs: 12 },
                tableColumns: [{ key: "col1" }],
                itemKey: "item-1",
                itemTermKey: "term-1",
                itemDescriptionKey: "desc-1",
                dataItemKey: "data-1",
                dataTitleItemKey: "title-1",
                id: "id-1",
                feedbackType: "error",
                hideOrgNr: true,
                format: "date",
                showRowNumbers: true,
                resourceBindings: { title: "Title" },
                resourceValues: { value: 123 },
                enableLinks: true,
                text: "Some text",
                order: { fieldKey: "asc" }
            };
            const attrs = new CustomElementHtmlAttributes(props);

            expect(attrs.isChildComponent).toBe("true");
            expect(attrs.formData).toBe(JSON.stringify(props.formData));
            expect(attrs.tagName).toBe("custom-tag");
            expect(attrs.size).toBe("h2");
            expect(attrs.hideTitle).toBe("true");
            expect(attrs.hideIfEmpty).toBe("true");
            expect(attrs.isEmpty).toBe("true");
            expect(attrs.inline).toBe("true");
            expect(attrs.styleOverride).toBe(JSON.stringify(props.styleOverride));
            expect(attrs.grid).toBe(JSON.stringify(props.grid));
            expect(attrs.tableColumns).toBe(JSON.stringify(props.tableColumns));
            expect(attrs.itemKey).toBe("item-1");
            expect(attrs.itemTermKey).toBe("term-1");
            expect(attrs.itemDescriptionKey).toBe("desc-1");
            expect(attrs.dataItemKey).toBe("data-1");
            expect(attrs.dataTitleItemKey).toBe("title-1");
            expect(attrs.id).toBe("id-1");
            expect(attrs.feedbackType).toBe("error");
            expect(attrs.hideOrgNr).toBe("true");
            expect(attrs.format).toBe("date");
            expect(attrs.showRowNumbers).toBe("true");
            expect(attrs.resourceBindings).toBe(JSON.stringify(props.resourceBindings));
            expect(attrs.resourceValues).toBe(JSON.stringify(props.resourceValues));
            expect(attrs.enableLinks).toBe("true");
            expect(attrs.text).toBe("Some text");
            expect(attrs.order).toBe(JSON.stringify(props.order));
        });

        it("should not set attributes if props are missing or falsy", () => {
            isValidHeaderSize.mockReturnValue(false);
            hasValue.mockReturnValue(false);
            const attrs = new CustomElementHtmlAttributes({});
            expect(attrs).toEqual({});
        });
    });

    describe("getFormDataAttributeFromProps", () => {
        it("should stringify string formData", () => {
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({ formData: "abc" })).toBe('"abc"');
        });
        it("should make numbers to string and JSON stringify", () => {
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({ formData: 123 })).toBe('"123"');
        });
        it("should stringify object formData", () => {
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({ formData: { a: 1 } })).toBe('{"a":1}');
        });
        it("should return null if formData is not present", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({})).toBeNull();
        });
        it("should not serialize a bare boolean, even though hasValue accepts one", () => {
            // Boolean form data always arrives inside an object, and the components package represents absent form
            // data as `false` via `hasValue(x) && x`. Emitting formData="false" would make an empty component look
            // populated, so a bare boolean is dropped on purpose.
            expect(hasValue(false)).toBe(true);
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({ formData: false })).toBeNull();
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({ formData: true })).toBeNull();
        });
        it("should keep a boolean that arrives inside an object", () => {
            expect(new CustomElementHtmlAttributes({}).getFormDataAttributeFromProps({ formData: { simpleBinding: false } })).toBe(
                '{"simpleBinding":false}'
            );
        });
    });

    describe("getIsChildComponentAttributeFromProps", () => {
        it('should return "true" if isChildComponent is truthy', () => {
            expect(new CustomElementHtmlAttributes({}).getIsChildComponentAttributeFromProps({ isChildComponent: true })).toBe("true");
        });
        it("should return null if isChildComponent is falsy", () => {
            expect(new CustomElementHtmlAttributes({}).getIsChildComponentAttributeFromProps({ isChildComponent: false })).toBeNull();
        });
    });

    describe("getTagNameAttributeFromProps", () => {
        it("should return tagName as string if present", () => {
            expect(new CustomElementHtmlAttributes({}).getTagNameAttributeFromProps({ tagName: "foo" })).toBe("foo");
        });
        it("should return null if tagName is missing", () => {
            expect(new CustomElementHtmlAttributes({}).getTagNameAttributeFromProps({})).toBeNull();
        });
    });

    describe("getSizeAttributeFromProps", () => {
        it("should return size as lowercase string if valid", () => {
            isValidHeaderSize.mockReturnValue(true);
            expect(new CustomElementHtmlAttributes({}).getSizeAttributeFromProps({ size: "H3" })).toBe("h3");
        });
        it("should return null if size is invalid", () => {
            isValidHeaderSize.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getSizeAttributeFromProps({ size: "foo" })).toBeNull();
        });
    });

    describe("getHideTitleAttributeFromProps", () => {
        it('should return "true" if hideTitle is true', () => {
            expect(new CustomElementHtmlAttributes({}).getHideTitleAttributeFromProps({ hideTitle: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getHideTitleAttributeFromProps({ hideTitle: "true" })).toBe("true");
        });
        it("should return null if hideTitle is false", () => {
            expect(new CustomElementHtmlAttributes({}).getHideTitleAttributeFromProps({ hideTitle: false })).toBeNull();
        });
    });

    describe("getHideIfEmptyAttributeFromProps", () => {
        it('should return "true" if hideIfEmpty is true', () => {
            expect(new CustomElementHtmlAttributes({}).getHideIfEmptyAttributeFromProps({ hideIfEmpty: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getHideIfEmptyAttributeFromProps({ hideIfEmpty: "true" })).toBe("true");
        });
        it("should return null if hideIfEmpty is false", () => {
            expect(new CustomElementHtmlAttributes({}).getHideIfEmptyAttributeFromProps({ hideIfEmpty: false })).toBeNull();
        });
    });

    describe("getIsEmptyAttributeFromProps", () => {
        it('should return "true" if isEmpty is true', () => {
            expect(new CustomElementHtmlAttributes({}).getIsEmptyAttributeFromProps({ isEmpty: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getIsEmptyAttributeFromProps({ isEmpty: "true" })).toBe("true");
        });
        it("should return null if isEmpty is false", () => {
            expect(new CustomElementHtmlAttributes({}).getIsEmptyAttributeFromProps({ isEmpty: false })).toBeNull();
        });
    });

    describe("getInlineAttributeFromProps", () => {
        it('should return "true" if inline is true', () => {
            expect(new CustomElementHtmlAttributes({}).getInlineAttributeFromProps({ inline: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getInlineAttributeFromProps({ inline: "true" })).toBe("true");
        });
        it("should return null if inline is false", () => {
            expect(new CustomElementHtmlAttributes({}).getInlineAttributeFromProps({ inline: false })).toBeNull();
        });
    });

    describe("getStyleOverrideAttributeFromProps", () => {
        it("should return JSON string if styleOverride has value", () => {
            expect(new CustomElementHtmlAttributes({}).getStyleOverrideAttributeFromProps({ styleOverride: { color: "red" } })).toBe(
                '{"color":"red"}'
            );
        });
        it("should return null if styleOverride is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getStyleOverrideAttributeFromProps({})).toBeNull();
        });
    });

    describe("getGridAttributeFromProps", () => {
        it("should return JSON string if grid has value", () => {
            expect(new CustomElementHtmlAttributes({}).getGridAttributeFromProps({ grid: { xs: 12 } })).toBe('{"xs":12}');
        });
        it("should return null if grid is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getGridAttributeFromProps({})).toBeNull();
        });
    });

    describe("getTableColumnsAttributeFromProps", () => {
        it("should return JSON string if tableColumns has value", () => {
            expect(new CustomElementHtmlAttributes({}).getTableColumnsAttributeFromProps({ tableColumns: [1, 2] })).toBe("[1,2]");
        });
        it("should return null if tableColumns is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getTableColumnsAttributeFromProps({})).toBeNull();
        });
    });

    describe("getItemKeyAttributeFromProps", () => {
        it("should return itemKey if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getItemKeyAttributeFromProps({ itemKey: "foo" })).toBe("foo");
        });
        it("should return null if itemKey is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getItemKeyAttributeFromProps({})).toBeNull();
        });
    });

    describe("getDataItemKeyAttributeFromProps", () => {
        it("should return dataItemKey if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getDataItemKeyAttributeFromProps({ dataItemKey: "foo" })).toBe("foo");
        });
        it("should return null if dataItemKey is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getDataItemKeyAttributeFromProps({})).toBeNull();
        });
    });

    describe("getDataTitleItemKeyAttributeFromProps", () => {
        it("should return dataTitleItemKey if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getDataTitleItemKeyAttributeFromProps({ dataTitleItemKey: "foo" })).toBe("foo");
        });
        it("should return null if dataTitleItemKey is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getDataTitleItemKeyAttributeFromProps({})).toBeNull();
        });
    });

    describe("getIdAttributeFromProps", () => {
        it("should return id if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getIdAttributeFromProps({ id: "foo" })).toBe("foo");
        });
        it("should return null if id is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getIdAttributeFromProps({})).toBeNull();
        });
    });

    describe("getFeedbackTypeAttributeFromProps", () => {
        it("should return feedbackType if valid", () => {
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({ feedbackType: "error" })).toBe("error");
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({ feedbackType: "warning" })).toBe("warning");
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({ feedbackType: "success" })).toBe("success");
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({ feedbackType: "info" })).toBe("info");
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({ feedbackType: "default" })).toBe("default");
        });
        it('should return "default" if feedbackType is invalid', () => {
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({ feedbackType: "invalid" })).toBe("default");
        });
        it("should return null if feedbackType is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getFeedbackTypeAttributeFromProps({})).toBeNull();
        });
    });

    describe("getHideOrgNrAttributeFromProps", () => {
        it('should return "true" if hideOrgNr is true', () => {
            expect(new CustomElementHtmlAttributes({}).getHideOrgNrAttributeFromProps({ hideOrgNr: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getHideOrgNrAttributeFromProps({ hideOrgNr: "true" })).toBe("true");
        });
        it("should return null if hideOrgNr is false", () => {
            expect(new CustomElementHtmlAttributes({}).getHideOrgNrAttributeFromProps({ hideOrgNr: false })).toBeNull();
        });
    });

    describe("getFormatAttributeFromProps", () => {
        it("should return format as string if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getFormatAttributeFromProps({ format: 123 })).toBe("123");
            expect(new CustomElementHtmlAttributes({}).getFormatAttributeFromProps({ format: "abc" })).toBe("abc");
        });
        it("should return null if format is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getFormatAttributeFromProps({})).toBeNull();
        });
    });

    describe("getShowRowNumbersAttributeFromProps", () => {
        it('should return "true" if showRowNumbers is true', () => {
            expect(new CustomElementHtmlAttributes({}).getShowRowNumbersAttributeFromProps({ showRowNumbers: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getShowRowNumbersAttributeFromProps({ showRowNumbers: "true" })).toBe("true");
        });
        it("should return null if showRowNumbers is false", () => {
            expect(new CustomElementHtmlAttributes({}).getShowRowNumbersAttributeFromProps({ showRowNumbers: false })).toBeNull();
        });
    });

    describe("getResourceBindingsFromProps", () => {
        it("should return JSON string if resourceBindings has value", () => {
            expect(new CustomElementHtmlAttributes({}).getResourceBindingsFromProps({ resourceBindings: { a: 1 } })).toBe('{"a":1}');
        });
        it("should return null if resourceBindings is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getResourceBindingsFromProps({})).toBeNull();
        });
    });

    describe("getResourceValuesFromProps", () => {
        it("should return JSON string if resourceValues has value", () => {
            expect(new CustomElementHtmlAttributes({}).getResourceValuesFromProps({ resourceValues: { a: 1 } })).toBe('{"a":1}');
        });
        it("should return null if resourceValues is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getResourceValuesFromProps({})).toBeNull();
        });
    });

    describe("getEnableLinksFromProps", () => {
        it('should return "true" if enableLinks is true', () => {
            expect(new CustomElementHtmlAttributes({}).getEnableLinksFromProps({ enableLinks: true })).toBe("true");
            expect(new CustomElementHtmlAttributes({}).getEnableLinksFromProps({ enableLinks: "true" })).toBe("true");
        });
        it("should return null if enableLinks is false", () => {
            expect(new CustomElementHtmlAttributes({}).getEnableLinksFromProps({ enableLinks: false })).toBeNull();
        });
    });

    describe("getTextAttributeFromProps", () => {
        it("should return text if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getTextAttributeFromProps({ text: "foo" })).toBe("foo");
        });
        it("should return null if text is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getTextAttributeFromProps({})).toBeNull();
        });
    });

    describe("getItemTermKeyAttributeFromProps", () => {
        it("should return itemTermKey if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getItemTermKeyAttributeFromProps({ itemTermKey: "term" })).toBe("term");
        });
        it("should return null if itemTermKey is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getItemTermKeyAttributeFromProps({})).toBeNull();
        });
    });

    describe("getItemDescriptionKeyAttributeFromProps", () => {
        it("should return itemDescriptionKey if has value", () => {
            expect(new CustomElementHtmlAttributes({}).getItemDescriptionKeyAttributeFromProps({ itemDescriptionKey: "desc" })).toBe("desc");
        });
        it("should return null if itemDescriptionKey is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getItemDescriptionKeyAttributeFromProps({})).toBeNull();
        });
    });

    describe("getOrderAttributeFromProps", () => {
        it("should return JSON string if order has value", () => {
            expect(new CustomElementHtmlAttributes({}).getOrderAttributeFromProps({ order: { fieldKey: "asc" } })).toBe('{"fieldKey":"asc"}');
        });
        it("should return null if order is missing", () => {
            hasValue.mockReturnValue(false);
            expect(new CustomElementHtmlAttributes({}).getOrderAttributeFromProps({})).toBeNull();
        });
    });
});
