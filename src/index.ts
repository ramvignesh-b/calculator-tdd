export type OperationType = 'add' | 'multiply';

export class Calculator {
    add(input: string): number {
        if (input === "") return 0;

        const { delimiter, operation, slicedInput } = this.getDelimiter(input);
        const numbers = this.parseNumbers(slicedInput, delimiter);

        this.validateNumbers(numbers);

        return this.calculateResult(this.filterValidNumbers(numbers), operation);
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

    private getDelimiter(input: string): {
        delimiter: RegExp,
        operation: OperationType,
        slicedInput: string
    } {
        let delimiter: RegExp = new RegExp("[\n,]", "g");
        let operation: OperationType = "add";
        let slicedInput = input;

        if(input.startsWith("//[")) {
            delimiter = this.checkMultiDelimiter(input);
            slicedInput = input.slice(input.lastIndexOf("]") + 1);
        } else if (input.startsWith("//")) {
            delimiter = this.checkSingleDelimiter(input);
            operation = this.getOperation(input[2]);
            slicedInput = input.slice(4);
        }

        return { delimiter, operation, slicedInput }
    }

    private getOperation(delimiter: string): OperationType {
        switch (delimiter) {
            case '*':
                return 'multiply';
            default:
                return 'add';
        }
    }

    private parseNumbers(input: string, delimiter: RegExp): number[] {
        return input.split(delimiter).map(number => parseInt(number));
    }

    private validateNumbers(numbers: number[]) {
        const negativeNumbers = numbers.filter(number => number < 0);
        if (negativeNumbers.length > 0) {
            throw "negative numbers not allowed: " + negativeNumbers.join(",");
        }
    }

    private filterValidNumbers(numbers: number[]): number[] {
        return numbers.filter(num => num <= 1000);
    }

    private calculateResult(numbers: number[], operation: OperationType): number {
        const { initialValue, callback } = this.getReducer(operation);

        return numbers.reduce(callback, initialValue);
    }

    private getReducer(operation: OperationType): { 
        initialValue: number,
        callback: (a: number, b: number) => number
    } {
        switch (operation) {
            case 'multiply':
                return {
                    initialValue: 1,
                    callback: (a, b) => a * b
                };
            default:
                return {
                    initialValue: 0,
                    callback: (a, b) => a + b
                };
        }
    }
}