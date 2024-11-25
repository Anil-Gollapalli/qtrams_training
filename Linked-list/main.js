import { LinkedList } from './linkedList.js';

// Check if DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed.');

  // Create a new LinkedList instance
  const list = new LinkedList();

  // Populate the LinkedList
  list.append('dog');
  list.append('cat');
  list.append('parrot');
  list.append('hamster');
  list.append('snake');
  list.append('turtle');

  // Log the LinkedList to the console
  console.log('LinkedList:', list.toString());

  // Update the DOM
  const listContainer = document.getElementById('list-container');
  if (listContainer) {
    listContainer.textContent = list.toString();
    console.log('LinkedList rendered on the page.');
  } else {
    console.error('list-container element not found in the DOM.');
  }
});
