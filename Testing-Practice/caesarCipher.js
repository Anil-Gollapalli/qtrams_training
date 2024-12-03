function caesarCipher(str, shift) {
    const shiftChar = (char, shift) => {
        const isUpperCase = char >= 'A' && char <= 'Z';
        const isLowerCase = char >= 'a' && char <= 'z';

        if (isUpperCase || isLowerCase) {
            const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base);
        }
        return char;
    };

    return str
        .split('')
        .map((char) => shiftChar(char, shift))
        .join('');
}

module.exports = caesarCipher;
