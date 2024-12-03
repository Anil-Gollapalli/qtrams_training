// Capitalize Function
function handleCapitalize() {
    const input = document.getElementById('capitalize-input').value;
    const result = capitalize(input);
    document.getElementById('capitalize-result').textContent = result;
}

// Reverse String Function
function handleReverse() {
    const input = document.getElementById('reverse-input').value;
    const result = reverseString(input);
    document.getElementById('reverse-result').textContent = result;
}

// Calculator Functions
function handleAdd() {
    const num1 = parseFloat(document.getElementById('calc-num1').value);
    const num2 = parseFloat(document.getElementById('calc-num2').value);
    const result = add(num1, num2);
    document.getElementById('calc-result').textContent = result;
}

function handleSubtract() {
    const num1 = parseFloat(document.getElementById('calc-num1').value);
    const num2 = parseFloat(document.getElementById('calc-num2').value);
    const result = subtract(num1, num2);
    document.getElementById('calc-result').textContent = result;
}

function handleMultiply() {
    const num1 = parseFloat(document.getElementById('calc-num1').value);
    const num2 = parseFloat(document.getElementById('calc-num2').value);
    const result = multiply(num1, num2);
    document.getElementById('calc-result').textContent = result;
}

function handleDivide() {
    const num1 = parseFloat(document.getElementById('calc-num1').value);
    const num2 = parseFloat(document.getElementById('calc-num2').value);
    const result = divide(num1, num2);
    document.getElementById('calc-result').textContent = result;
}

// Caesar Cipher Function
function handleCaesarCipher() {
    const input = document.getElementById('cipher-input').value;
    const shift = parseInt(document.getElementById('shift-input').value);
    const result = caesarCipher(input, shift);
    document.getElementById('cipher-result').textContent = result;
}

// Analyze Array Function
function handleAnalyzeArray() {
    const input = document.getElementById('array-input').value.split(',').map(Number);
    const result = analyzeArray(input);
    document.getElementById('array-result').textContent = JSON.stringify(result);
}

// Import functions from other JS files
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const reverseString = (str) => str.split('').reverse().join('');
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b !== 0 ? a / b : 'Error: Division by zero');
const caesarCipher = (str, shift) => {
    return str.split('')
        .map((char) => {
            if (char >= 'a' && char <= 'z') {
                return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26 + 26) % 26 + 97);
            }
            if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26 + 65);
            }
            return char;
        })
        .join('');
};
const analyzeArray = (arr) => {
    const average = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const length = arr.length;
    return { average, min, max, length };
};
