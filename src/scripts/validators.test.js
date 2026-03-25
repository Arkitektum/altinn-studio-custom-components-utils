import { isValidHeaderSize, isValidTagName } from "./validators";

describe("validators", () => {
    describe("isValidHeaderSize", () => {
        beforeAll(() => {
            jest.mock("../constants/validSizeValues", () => ({ validSizeValues: ["h1", "h2", "h3"] }));
        });
        it("returns true for valid header size (case-insensitive)", () => {
            expect(isValidHeaderSize("h1")).toBe(true);
            expect(isValidHeaderSize("H2")).toBe(true);
        });
        it("returns false for invalid header size", () => {
            expect(isValidHeaderSize("h7")).toBe(false);
            expect(isValidHeaderSize("")).toBe(false);
            expect(isValidHeaderSize(null)).toBe(false);
        });
    });

    describe("isValidTagName", () => {
        beforeAll(() => {
            jest.mock("../constants/customElementTagNames", () => ({ customElementTagNames: ["custom-header", "custom-footer"] }));
        });
        it("returns true for valid tag name", () => {
            expect(isValidTagName("custom-header")).toBe(true);
        });
        it("returns false for invalid tag name", () => {
            expect(isValidTagName("div")).toBe(false);
            expect(isValidTagName("")).toBe(false);
            expect(isValidTagName(null)).toBe(false);
        });
    });
});
