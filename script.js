let goods = 0;
let money = 0;
let taxRate = 0.10;
let population = 0;
let houses = 0;

function produce() {
  goods += 1;
  let tax = parseFloat((1 * taxRate).toFixed(2));
  money += tax;
  updateDisplay();
}

function decreaseTax() {
  if (taxRate > 0.05) {
    taxRate -= 0.05;
    taxRate = Math.round(taxRate * 100) / 100;
    updateDisplay();
  }
}

function increaseTax() {
  if (taxRate < 1.0) {
    taxRate += 0.05;
    taxRate = Math.round(taxRate * 100) / 100;
    updateDisplay();
  }
}

function buildHouse() {
  if (money >= 10) {
    money -= 10;
    houses += 1;
    population += 5;
    updateDisplay();
  } else {
    alert("Not enough coins to build a house!");
  }
}

function updateDisplay() {
  document.getElementById("goods").textContent = goods;
  document.getElementById("money").textContent = money.toFixed(2);
  document.getElementById("taxRate").textContent = Math.round(taxRate * 100) + "%";
  document.getElementById("population").textContent = population;
  document.getElementById("houseCount").textContent = houses;
}

// Passive population growth: +1 per house every 5 seconds
setInterval(() => {
  if (houses > 0) {
    population += houses;
    updateDisplay();
  }
}, 5000);
// Passive production based on population
setInterval(() => {
  if (population > 0) {
    let produced = Math.floor(population / 10); // 1 good per 10 people
    goods += produced;
    let tax = parseFloat((produced * taxRate).toFixed(2));
    money += tax;
    updateDisplay();
  }
}, 1000); // Runs every second
function saveGame() {
  const gameData = {
    goods,
    money,
    taxRate,
    population,
    houses
  };
  localStorage.setItem("taxGameSave", JSON.stringify(gameData));
}

function loadGame() {
  const saved = localStorage.getItem("taxGameSave");
  if (saved) {
    const gameData = JSON.parse(saved);
    goods = gameData.goods || 0;
    money = gameData.money || 0;
    taxRate = gameData.taxRate || 0.10;
    population = gameData.population || 0;
    houses = gameData.houses || 0;
    updateDisplay();
  }
}

// Save the game every 5 seconds
setInterval(saveGame, 5000);

// Load the game when page loads
window.onload = loadGame;
