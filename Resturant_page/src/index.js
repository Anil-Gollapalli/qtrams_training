import homeTab from './homeTab';
import menuTab from './menuTab';
import contactTab from './contactTab';
import './style.css';  // Import CSS directly into JavaScript


const contentDiv = document.getElementById('content');
const homeBtn = document.getElementById('homeBtn');
const menuBtn = document.getElementById('menuBtn');
const contactBtn = document.getElementById('contactBtn');

homeBtn.addEventListener('click', () => {
  contentDiv.innerHTML = '';
  contentDiv.appendChild(homeTab());
});

menuBtn.addEventListener('click', () => {
  contentDiv.innerHTML = '';
  contentDiv.appendChild(menuTab());
});

contactBtn.addEventListener('click', () => {
  contentDiv.innerHTML = '';
  contentDiv.appendChild(contactTab());
});

// Load the home tab by default
window.addEventListener('load', () => {
  contentDiv.appendChild(homeTab());
});
