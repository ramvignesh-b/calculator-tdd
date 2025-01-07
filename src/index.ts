export class Calculator {
    add(_input: string): number {
        let result = 0;
        let input = _input;

        if (input === "") {
            return 0;
        }

        let delimiter: RegExp = new RegExp("[\n,]", "g");
        let operation: 'add' | 'multiply' = "add";

        if (input.startsWith("//[")) {
            delimiter = this.checkMultiDelimiter(input);
            input = input.slice(input.lastIndexOf(']') + 1);
        } else if (input.startsWith("//")) {
            delimiter = this.checkSingleDelimiter(input);
            operation = input[2] === '*' ? "multiply" : "add";
        }

        let numbers = input.split(delimiter).map(number => parseInt(number));
        let negativeNumbers: number[] = [];
        negativeNumbers = numbers.filter(number => number < 0);

        result = numbers.filter(number => number <= 1000).reduce((a, b) => (operation === 'multiply') ? a * b : a + b, (operation === "multiply") ? 1 : 0);

        if (negativeNumbers.length > 0) {
            throw "negative numbers not allowed: " + negativeNumbers.join(",");
        }

        return result;
    }

    private checkMultiDelimiter(_input: string): RegExp {
        const multiDelimitersList = _input.match(new RegExp(/\[(.*?)\]/, "g"))?.map(match => match.replace(new RegExp(/[\[\]]/, "g"), ""));
        let escapedMultiDelimiter = "";
        multiDelimitersList?.map(_delimiter => {
            for (let i = 0; i < _delimiter.length; i++) {
                escapedMultiDelimiter += `\\${_delimiter[i]}`;
            }
        });
        return new RegExp(`[\n,${escapedMultiDelimiter}]`, "g");
    }

    private checkSingleDelimiter(_input: string): RegExp {
        return new RegExp(`[\n,${_input[2]}]`, "g");
    }
}