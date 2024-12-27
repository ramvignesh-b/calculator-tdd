export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        const numbers = input.split(",");
        if (numbers.length === 1) {
            return parseInt(numbers[0]);
        }
        sum = parseInt(numbers[0]) + parseInt(numbers[1]);
        return sum;
    }
}