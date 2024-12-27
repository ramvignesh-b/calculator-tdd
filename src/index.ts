export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        const numbers = input.split(",");
        sum = numbers.map(number => parseInt(number)).reduce((a, b) => a + b, 0);
        return sum;
    }
}