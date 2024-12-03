const calculator = require('../calculator');

test('calculator basic operations', () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(calculator.subtract(5, 2)).toBe(3);
    expect(calculator.multiply(4, 3)).toBe(12);
    expect(calculator.divide(6, 3)).toBe(2);
    expect(calculator.divide(6, 0)).toBe('Error: Division by zero');
});
