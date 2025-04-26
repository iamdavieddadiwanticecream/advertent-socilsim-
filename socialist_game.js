let educationPercent = 0;  // Declare educationPercent once

// Update Education Percentage
function updateEducation() {
  const requiredSchools = Math.ceil(population / 300); // 1 school needed for every 300 people
  if (requiredSchools === 0) {
    educationPercent = 0; // No schools needed
  } else {
    educationPercent = Math.min(100, Math.floor((schools / requiredSchools) * 100)); // Calculate % progress
  }
  // Update the display of education
  document.getElementById("educationPercent").textContent = `${educationPercent}%`;
}

// Tax will now depend on educationPercent
let tax = baseTax * (educationPercent >= 100 ? 2 : 1);

// Update the interval speed based on education
function getInterval(base) {
  return educationPercent >= 100 ? base / 2 : base;
}

// Call the update logic every interval
setInterval(updateStuff, getInterval(1000));

// Update education percentage periodically
setInterval(updateEducation, 5000); // Update education progress every 5 seconds (or adjust as needed)

// Function to handle stuff that happens periodically (like production)
function updateStuff() {
  // Example of what you might do during intervals (like producing goods, calculating tax, etc.)
  // This is just a placeholder for your game logic
  produceGoods();
  calculateTax();
}

// Example of how you can calculate tax based on the updated tax rate
function calculateTax() {
  let taxRevenue = money * tax;
  money += taxRevenue;
  updateDisplay();  // Update the display after tax is calculated
}

// Function to produce goods (example)
function produceGoods() {
  if (stability > 20) {
    goods += 1;  // Produce 1 good per interval (you can adjust this logic)
  }
}

// Ensure the `updateDisplay()` function is also called to reflect any changes
function updateDisplay() {
  // Update display elements
  document.getElementById("goods").textContent = goods.toLocaleString();
  document.getElementById("money").textContent = money.toFixed(2).toLocaleString();
  document.getElementById("population").textContent = population.toLocaleString();
  // Update other stats like tax, houses, stability etc.
  // Display the education progress
  document.getElementById("educationPercent").textContent = `${educationPercent}%`;
}

// Initialize the game state when the page loads
window.onload = function () {
  loadGame();  // Load saved game state
  updateEducation();  // Update education on load
  updateDisplay();  // Update all display stats
};
