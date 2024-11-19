export default function homeTab() {
    const div = document.createElement('div');
    div.innerHTML = `
      <h1>Welcome to Our Restaurant!</h1>
      <img src="restaurant.jpg" alt="Restaurant">
      <p>Enjoy our delicious meals and great service.</p>
    `;
    return div;
  }
  