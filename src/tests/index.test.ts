import { Calculator } from "../index";

describe("Calculator", () => {
    const calculator = new Calculator();
    it("should return 0 for empty string input", () => {
        expect(calculator.add("")).toBe(0);
    });

    it("should return the number itself for a single number input", () => {
        expect(calculator.add("2")).toBe(2);
    });

    it("should return the sum of two numbers for a two number input", () => {
        expect(calculator.add("2,3")).toBe(5);
    });

    it("should return the sum of all the numbers for a multiple number input", () => {
        expect(calculator.add("2,3,4,5")).toBe(14);
    });

    it("should return the sum of all the numbers for a multiple number input with new lines", () => {
        expect(calculator.add("2,3\n4,5")).toBe(14);
    });
});

