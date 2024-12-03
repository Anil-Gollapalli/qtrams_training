const caesarCipher = require('../caesarCipher');

test('shift characters with wrapping from z to a', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc');
});

test('preserves case of letters', () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
});

test('ignores non-alphabetical characters', () => {
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
});
