const reverseString = require('../reverseString');

test('reverse a string', () => {
    expect(reverseString('hello')).toBe('olleh');
    expect(reverseString('world')).toBe('dlrow');
});

test('return empty string for non-string input', () => {
    expect(reverseString(null)).toBe('');
});
