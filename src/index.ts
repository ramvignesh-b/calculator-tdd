export class Calculator {
    add(input: string): number {
        let result = 0;
        if (input === "") {
            return 0;
        }
        let delimiter: RegExp = new RegExp("[\n,]", "g");
        let operation: 'add' | 'multiply' = "add";
        // TODO: COde split
        if (input.startsWith("//[")) {
            const multiDelimitersList = input.match(new RegExp(/\[(.*?)\]/, "g"))?.map(match => match.replace(new RegExp(/[\[\]]/, "g"), ""));
            let escapedMultiDelimiter = "";
            multiDelimitersList?.map(_delimiter => {
                for (let i = 0; i < _delimiter.length; i++) {
                    escapedMultiDelimiter += `\\${_delimiter[i]}`;
                }
            });
            delimiter = new RegExp(`[\n,${escapedMultiDelimiter}]`, "g");
            input = input.slice(input.lastIndexOf("]") + 1);
        } else if (input.startsWith("//")) {
            delimiter = new RegExp(`[\n,${input[2]}]`, "g");
            if (input[2] === '*') {
                operation = 'multiply';
            }
            input = input.slice(4);
        }

        const numbers = input.split(delimiter);
        let negativeNumbers = "";

        result = numbers.filter(number => parseInt(number) <= 1000).map(number => {
            if (parseInt(number) < 0) {
                negativeNumbers += number + ",";
            }
            return parseInt(number);
        }).reduce((a, b) => {
            if (operation === 'multiply') {
                return a * b;
            } else {
                return a + b;
            }
        }, operation === "multiply" ? 1 : 0);


        if (negativeNumbers !== "") {
            throw "negative numbers not allowed: " + negativeNumbers;
        }
        return result;
    }
}