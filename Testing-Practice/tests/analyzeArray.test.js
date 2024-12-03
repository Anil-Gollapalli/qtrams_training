const analyzeArray = require('../analyzeArray');

test('analyze array properties', () => {
    const result = analyzeArray([1, 8, 3, 4, 2, 6]);
    expect(result).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    });
});

test('return null for invalid or empty input', () => {
    expect(analyzeArray([])).toBe(null);
});
