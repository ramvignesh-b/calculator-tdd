# Calculator TDD Demo

A practical demonstration of Test-Driven Development using a string calculator implementation in TypeScript and Jest.

## Project Overview

This calculator handles string inputs with various delimiters and demonstrates TDD principles through incremental development, as instructed in https://osherove.com/tdd-kata-1/.

## Implemented Features

1. Basic string-to-number addition (by default)
2. Multiple numbers support, initially delimited by `,`
3. Handle new-line `\n` between numbers
3. Custom delimiter support, when input starts with `//`
4. Negative number validation (throws exception)
5. **[Bonus]** Upper limit of 1000 for numbers
6. **[Bonus]** Handle custom delimiters of multiple lengths
7. **[Bonus]** Handle multiple custom delimiters
8. **[Bonus]** Handle multiple custom delimiters of multiple lengths
9. Perform multiplication on `*` delimiter

## Technical Stack

- TypeScript 5.7+
- Jest 29.7

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm test` to execute test suite

## TDD Learning Points

### 1. Incremental Development
The calculator was built iteratively:
- Started with simplest case (empty string)
- Added single number support
- Evolved to handle multiple numbers
- Implemented custom delimiters
- Added validation rules via Regular Expression

### 2. Test-First Approach
Every feature was developed following the clean TDD principles:
```md
1. Write failing test
2. Implement minimal code
3. Refactor while keeping tests green
```

### 3. Edge Cases
The implementation handles:
- Empty strings
- Custom delimiters
- Multiple delimiters
- Negative numbers
- Numbers > 1000

## Usage Example

```typescript
const calculator = new Calculator();

// Basic usage
calculator.add("1,2,3");  // Returns 6

// Custom delimiter
calculator.add("//;\n1;2;3");  // Returns 6

// Multiple custom delimiters
calculator.add("//[***][%%%]\n1***2%%%3");  // Returns 6

// Multiplication usage
calculator.add("//*\n1*2*3*4");  // Returns 24
```

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## CI/CD

The project includes GitHub Actions workflow that:
- Runs on multiple Node.js versions (18.x, 20.x, 22.x)
- Executes test suite on every push and PR

## Development Guidelines

1. Always write tests first
2. Keep functions focused and small
3. Consider edge cases in tests
4. Refactor after getting green tests
