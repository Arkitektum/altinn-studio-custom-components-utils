import { addContainerElement, addStyle, appendChildren, calculateFlexWidth, createCustomElement, setAttributes } from "./elementHelpers";

describe("elementHelpers", () => {
    describe("appendChildren", () => {
        it("appends HTMLElement children", () => {
            const parent = document.createElement("div");
            const child1 = document.createElement("span");
            const child2 = document.createElement("b");
            appendChildren(parent, [child1, child2]);
            expect(parent.children.length).toBe(2);
            expect(parent.children[0]).toBe(child1);
            expect(parent.children[1]).toBe(child2);
        });
        it("appends string children as text nodes", () => {
            const parent = document.createElement("div");
            appendChildren(parent, ["foo", "bar"]);
            expect(parent.childNodes.length).toBe(2);
            expect(parent.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
            expect(parent.childNodes[0].textContent).toBe("foo");
            expect(parent.childNodes[1].textContent).toBe("bar");
        });
        it("filters out falsy children", () => {
            const parent = document.createElement("div");
            appendChildren(parent, [null, undefined, false, "ok"]);
            expect(parent.childNodes.length).toBe(1);
            expect(parent.childNodes[0].textContent).toBe("ok");
        });
        it("converts number children to text nodes", () => {
            const parent = document.createElement("div");
            appendChildren(parent, [42]);
            expect(parent.childNodes.length).toBe(1);
            expect(parent.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
            expect(parent.childNodes[0].textContent).toBe("42");
        });
    });

    describe("setAttributes", () => {
        it("sets multiple attributes", () => {
            const el = document.createElement("div");
            setAttributes(el, { id: "foo", "data-bar": 123 });
            expect(el.getAttribute("id")).toBe("foo");
            expect(el.dataset.bar).toBe("123");
        });
        it("skips null/undefined attributes", () => {
            const el = document.createElement("div");
            setAttributes(el, { a: null, b: undefined, c: "ok" });
            expect(el.hasAttribute("a")).toBe(false);
            expect(el.hasAttribute("b")).toBe(false);
            expect(el.getAttribute("c")).toBe("ok");
        });
        it("returns for invalid element", () => {
            expect(() => setAttributes(null, { a: 1 })).not.toThrow();
            expect(() => setAttributes({}, { a: 1 })).toThrow();
        });
        it("returns for non-object attributes", () => {
            const el = document.createElement("div");
            expect(() => setAttributes(el, null)).not.toThrow();
            expect(() => setAttributes(el, 123)).not.toThrow();
        });
    });

    describe("addStyle", () => {
        it("applies style properties", () => {
            const el = document.createElement("div");
            addStyle(el, { color: "red", backgroundColor: "blue" });
            expect(el.style.color).toBe("red");
            expect(el.style.backgroundColor).toBe("blue");
        });
        it("returns for invalid element", () => {
            expect(() => addStyle(null, { color: "red" })).not.toThrow();
            expect(() => addStyle({}, { color: "red" })).toThrow();
        });
        it("returns for non-object style", () => {
            const el = document.createElement("div");
            expect(() => addStyle(el, null)).not.toThrow();
            expect(() => addStyle(el, 123)).not.toThrow();
        });
    });

    describe("calculateFlexWidth", () => {
        it("returns 100 if no grid", () => {
            expect(calculateFlexWidth()).toBe(100);
            expect(calculateFlexWidth(null)).toBe(100);
        });
        it("calculates min flex width from grid", () => {
            expect(calculateFlexWidth({ xs: 6 })).toBe(50);
            expect(calculateFlexWidth({ xs: 6, sm: 4 })).toBeCloseTo(33.333, 1);
            expect(calculateFlexWidth({ xs: 12, sm: 8, md: 6, lg: 4, xl: 3 })).toBeCloseTo(25, 1);
        });
        it("uses fallback for missing breakpoints", () => {
            expect(calculateFlexWidth({ xs: 8 })).toBeCloseTo(66.666, 1);
            expect(calculateFlexWidth({ xs: 8, sm: 6 })).toBeCloseTo(50, 1);
        });
        it("treats non-numeric grid values as the previous breakpoint fallback", () => {
            expect(calculateFlexWidth({ xs: "invalid" })).toBe(100);
            expect(calculateFlexWidth({ xs: 6, sm: "bad" })).toBe(50);
        });
    });

    describe("addContainerElement", () => {
        it("wraps component in styled container", () => {
            const comp = document.createElement("span");
            const grid = { xs: 6 };
            const container = addContainerElement(comp, grid);
            expect(container.tagName).toBe("DIV");
            expect(container.style.flexBasis).toBe("50%");
            expect(container.style.maxWidth).toBe("50%");
            expect(container.style.flexGrow).toBe("0");
            expect(container.style.padding).toBe("0.75rem 0px");
            expect(container.firstChild.firstChild).toBe(comp);
        });
        it("defaults to 100% if no grid", () => {
            const comp = document.createElement("span");
            const container = addContainerElement(comp);
            expect(container.style.flexBasis).toBe("100%");
            expect(container.style.maxWidth).toBe("100%");
        });
    });

    describe("createCustomElement", () => {
        it("creates element with attributes", () => {
            const el = createCustomElement("custom-header", { id: "foo", "data-bar": "baz" });
            expect(el.tagName.toLowerCase()).toBe("custom-header");
            expect(el.getAttribute("id")).toBe("foo");
            expect(el.dataset.bar).toBe("baz");
            expect(el.getAttribute("tagName")).toBe("custom-header");
        });
        it("throws for invalid tag name", () => {
            expect(() => createCustomElement("invalid!tag", {})).toThrow();
        });
    });
});
