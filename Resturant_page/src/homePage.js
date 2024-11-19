export default function loadHomePage() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
      <h1>Welcome to Our Restaurant!</h1>
      <img src="restaurant.jpg" alt="Restaurant">
      <p>Enjoy our delicious meals and great service.</p>
    `;
  }
  