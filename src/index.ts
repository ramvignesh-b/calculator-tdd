export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        sum = parseInt(input);
        return sum;
    }
}