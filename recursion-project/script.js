// Fibonacci Iterative Function
function fibs(n) {
  let result = [0, 1];

  if (n <= 1) {
    return result.slice(0, n);  // Handle small cases
  }

  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}

// Fibonacci Recursive Function
function fibsRec(n) {
  // Base case for recursion (handling 0 and 1 correctly)
  if (n === 1) return [0];  // Only the first Fibonacci number (0)
  if (n === 2) return [0, 1]; // First two Fibonacci numbers: [0, 1]

  // Recursive case: get the sequence up to n-1
  const sequence = fibsRec(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]); // Add the next Fibonacci number

  return sequence;
}

// Function to display Fibonacci results
function displayFibonacci() {
  const fibInput = document.getElementById("fibInput").value;
  const n = parseInt(fibInput);

  // Check if the input is a valid number
  if (isNaN(n) || n <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  // Display iterative and recursive results
  const fibIterative = fibs(n);  // Call the iterative Fibonacci function
  const fibRecursive = fibsRec(n);  // Call the recursive Fibonacci function

  // Update the page with the results
  document.getElementById("fibResult").innerHTML = `
    <h3>Iterative Fibonacci:</h3> 
    <p>${fibIterative.join(", ")}</p>
    <h3>Recursive Fibonacci:</h3> 
    <p>${fibRecursive.join(", ")}</p>
  `;
}

// Merge Sort Function
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// Merge Helper Function
function merge(left, right) {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Function to display Merge Sort result
function displayMergeSort() {
  const sortInput = document.getElementById("sortInput").value;
  const arr = sortInput.split(",").map(num => parseInt(num.trim()));

  // Check if the input contains valid numbers
  if (arr.some(isNaN)) {
    alert("Please enter valid numbers separated by commas.");
    return;
  }

  const sortedArray = mergeSort(arr);

  document.getElementById("mergeSortResult").innerHTML = `
    <h3>Sorted Array:</h3>
    <p>${sortedArray.join(", ")}</p>
  `;
}
