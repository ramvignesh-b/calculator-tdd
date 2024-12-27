export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        let delimiter: RegExp = new RegExp("[\n,]", "g");
        if (input.startsWith("//")) {
            delimiter = new RegExp(`[\n,${input[2]}]`, "g");
            input = input.slice(4);
        }
        const numbers = input.split(delimiter);
        let negativeNumbers = "";
        sum = numbers.map(number => {
            if (parseInt(number) < 0) {
                negativeNumbers += number + ",";
            }
            return parseInt(number);
        }).reduce((a, b) => a + b, 0);
        if (negativeNumbers !== "") {
            throw "negative numbers not allowed: " + negativeNumbers;
        }
        return sum;
    }
}