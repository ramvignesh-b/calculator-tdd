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

    it ("should handle custom delimiters and return the sum of all the numbers", () => {
        expect(calculator.add("//;\n1;2")).toBe(3);
    });

    it("should multiply the numbers when the delimiter is *", () => {
        expect(calculator.add("//*\n1*2*3*4")).toBe(24);
    })

    it("should throw an exception for a negative number", () => {
        expect(() => calculator.add("-1")).toThrow("negative numbers not allowed: -1");
        expect(() => calculator.add("1,-1")).toThrow("negative numbers not allowed: -1");
    });

    it("should throw an exception for negative inputs, listing all the negative numbers", () => {
        expect(() => calculator.add("1,-1,-2,3")).toThrow("negative numbers not allowed: -1,-2");
    });

    it("should ignore numbers bigger than 1000", () => {
        expect(calculator.add("2,1001,1002")).toBe(2);
        expect(calculator.add("2,1001,1000")).toBe(1002);
    });

    it("should handle delimiters of multiple length and return the sum of all the numbers", () => {
        expect(calculator.add("//[***]\n1***2***3")).toBe(6);
    });

    it("should handle more than one custom delimiter and return the sum of all the numbers", () => {
        expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
        expect(calculator.add("//[***][%]\n1***2%3")).toBe(6);
    });

    // * Few more edge cases
    it("should handle multiple consecutive delimiters and ignore empty splits", () => {
        expect(calculator.add("1,,2")).toBe(3);
    });

    it("should handle overlapping custom delimiters", () => {
        expect(calculator.add("//[*][**]\n1*2**3")).toBe(6);
    });

    it("should return 0 if input only contains delimiters", () => {
        expect(calculator.add("//[***][%]\n***%%%")).toBe(0);
    });

    it("should handle whitespace delimiters", () => {
        expect(calculator.add("//[ ]\n1 2 3")).toBe(6);
    });  
});

