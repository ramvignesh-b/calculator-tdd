export class Calculator {
    add(input: string): number {
        let sum = 0;
        if (input === "") {
            return 0;
        }
        if (input.startsWith("//")) {
            let delimiter = input[2];
            input = input.substring(4).replace(delimiter, ",");
            
        }
        const numbers = input.replace(/\n/g, ",").split(",");
        sum = numbers.map(number => parseInt(number)).reduce((a, b) => a + b, 0);
        return sum;
    }
}