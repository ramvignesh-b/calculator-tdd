export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        let delimiter: RegExp = new RegExp("[\n,]", "g");
        
        if (input.startsWith("//[")) {
            const multiDelimiter = input.slice(4, input.indexOf("]"));
            let escapedMultiDelimiter = "";
            for (let i = 0; i < multiDelimiter.length; i++) {
                escapedMultiDelimiter += `\\${multiDelimiter[i]}`;
            }
            delimiter = new RegExp(`[\n,${escapedMultiDelimiter}]`, "g");
            input = input.slice(input.indexOf("]") + 1);
        } else if (input.startsWith("//")) {
            delimiter = new RegExp(`[\n,${input[2]}]`, "g");
            input = input.slice(4);
        }

        const numbers = input.split(delimiter);
        let negativeNumbers = "";
        sum = numbers.filter(number => parseInt(number) <= 1000).map(number => {
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