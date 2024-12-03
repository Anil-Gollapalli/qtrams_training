const capitalize = require('../capitalize');

test('capitalize first character of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
});

test('returns an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
});
