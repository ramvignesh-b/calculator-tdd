export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        if (parseInt(input) < 0) {
            throw new Error(`negative numbers not allowed: ${input}`);
        }
        let delimiter: RegExp = new RegExp("[\n,]", "g");
        if (input.startsWith("//")) {
            delimiter = new RegExp(`[\n,${input[2]}]`, "g");
            input = input.slice(4);
        }
        const numbers = input.split(delimiter);
        sum = numbers.map(number => parseInt(number)).reduce((a, b) => a + b, 0);
        return sum;
    }
}