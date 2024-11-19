export default function menuTab() {
    const div = document.createElement('div');
    div.innerHTML = `
      <h1>Our Menu</h1>
      <ul>
        <li>Spaghetti</li>
        <li>Pizza</li>
        <li>Salads</li>
      </ul>
    `;
    return div;
  }
  