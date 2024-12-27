import { Calculator } from "../index";

describe("Calculator", () => {
    it("should return 0 for empty string input", () => {
        const calculator = new Calculator();
        expect(calculator.add("")).toBe(0);
    });
});

