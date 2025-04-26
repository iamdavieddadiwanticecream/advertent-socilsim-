let goods = 0;
let money = 0;
let taxRate = 0.10;
let population = 0;
let houses = 0;
let stability = 100;
let farms = 0;
let housingFactories = 0;
let schools = 0;

function produce() {
  if (stability <= 20) {
    alert("The people are too unhappy to work!");
    return;
  }
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

function buildFarm() {
  if (money >= 200) {
    money -= 200;
    farms += 1;
    goods += 10; // Each farm produces 10 goods per production cycle
    updateDisplay();
  } else {
    alert("Not enough coins to build a farm!");
  }
}

function buildHousingFactory() {
  if (money >= 5000) {
    money -= 5000;
    housingFactories += 1;
    updateDisplay();
  } else {
    alert("Not enough coins to build a housing factory!");
  }
}
// Housing factories build 1 house every 5 sec per factory
setInterval(() => {
  if (housingFactories > 0) {
    houses += housingFactories;
    population += housingFactories * 5; // Each house adds 5 population
    updateDisplay();
  }
}, 5000);

function buildSchool() {
  if (money >= 30) {
    money -= 30;
    schools += 1;
    stability += 5; // Each school increases stability
    updateDisplay();
  } else {
    alert("Not enough coins to build a school!");
  }
}

function updateDisplay() {
  document.getElementById("goods").textContent = goods.toLocaleString();
  document.getElementById("money").textContent = money.toFixed(2).toLocaleString();  // Format money (tax revenue)
  document.getElementById("taxRate").textContent = Math.round(taxRate * 100) + "%";
  document.getElementById("population").textContent = population.toLocaleString();
  document.getElementById("houseCount").textContent = houses.toLocaleString();
  document.getElementById("stability").textContent = stability + "%";
  document.getElementById("farmCount").textContent = farms.toLocaleString();
  document.getElementById("housingFactoryCount").textContent = housingFactories.toLocaleString();
  document.getElementById("schoolCount").textContent = schools.toLocaleString();
}
}
function updateStability() {
  // Calculate target based on tax rate
  let target = Math.max(0, 100 - Math.floor(taxRate * 100 * 1.5));

  if (stability > target) {
    stability -= 1;
  } else if (stability < target) {
    stability += 1;
  }

  // Update display
  document.getElementById("stability").textContent = stability + "%";
}

// 🔄 Save/load system
function saveGame() {
  const gameData = {
    goods,
    money,
    taxRate,
    population,
    houses,
    stability,
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
    stability = gameData.stability || 100;
    updateDisplay();
  }
}

function resetGame() {
  localStorage.removeItem("taxGameSave");
  goods = 0;
  money = 0;
  taxRate = 0.10;
  population = 0;
  houses = 0;
  stability = 100;
  updateDisplay();
}

// ⏱ Intervals

// Gradually update stability every 2.5 seconds
setInterval(updateStability, 2500);

// Passive production if stability is OK
setInterval(() => {
  if (stability > 20) {
    let autoProduced = Math.floor(population / 10);
    if (autoProduced > 0) {
      goods += autoProduced;
      let tax = parseFloat((autoProduced * taxRate).toFixed(2));
      money += tax;
      updateDisplay();
    }
  }
}, 1000);

// Lose 10% of population every 10 sec if stability is low
setInterval(() => {
  if (stability <= 20 && population > 0) {
    let lost = Math.floor(population * 0.10);
    population = Math.max(0, population - lost);
    updateDisplay();
  }
}, 10000);

// Auto-save every 5 sec
setInterval(saveGame, 5000);

// Load save on start
window.onload = function () {
  loadGame();
  updateStability();
};
// Passive population growth based on houses, 1 population every 2 seconds
setInterval(() => {
  if (stability > 20) {
    population += houses;  // Each house contributes 1 population every 2 seconds
    updateDisplay();
  }
}, 2000);  // Set interval to 2 seconds
