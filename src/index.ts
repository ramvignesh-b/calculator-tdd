export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        let delimiter: RegExp = new RegExp("[\n,]", "g");

        if (input.startsWith("//[")) {
            if ((input.match(new RegExp(/\[(.*?)\]/, "g"))?.length ?? 0) > 1) {
                // multiple delimiters enclosed in []
                const multiDelimitersList = input.match(new RegExp(/\[(.*?)\]/, "g"))?.map(match => match.replace(new RegExp(/[\[\]]/, "g"), ""));
                let escapedMultiDelimiter = "";
                multiDelimitersList?.map(_delimiter => {
                    for (let i = 0; i < _delimiter.length; i++) {
                        escapedMultiDelimiter += `\\${_delimiter[i]}`;
                    }   
                });
                delimiter = new RegExp(`[\n,${escapedMultiDelimiter}]`, "g");
                input = input.slice(input.lastIndexOf("]") + 1);
            } else {
                const multiDelimiter = input.slice(4, input.indexOf("]"));
                let escapedMultiDelimiter = "";
                for (let i = 0; i < multiDelimiter.length; i++) {
                    escapedMultiDelimiter += `\\${multiDelimiter[i]}`;
                }
                delimiter = new RegExp(`[\n,${escapedMultiDelimiter}]`, "g");
                input = input.slice(input.indexOf("]") + 1);
            }
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