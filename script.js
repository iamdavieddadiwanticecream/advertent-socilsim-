let goods = 0;
let money = 0;
let taxRate = 0.10;
let population = 0;
let farmPeopleRequired = 100;
let houses = 0;
let stability = 100;
let farms = 0;
let housingFactories = 0;
let schools = 0;

let housePrice = 10;
let farmPrice = 200;
let housingFactoryPrice = 5000;
let schoolPrice = 30;

function buildHouse() {
  if (money >= housePrice) {
    money -= housePrice;
    houses += 1;
    population += 5;
    housePrice = Math.round(housePrice * 1.20); // Increase price by 20%
    console.log("New house price: " + housePrice);  // Debugging line
    updateDisplay();
  } else {
    alert("Not enough coins to build a house!");
  }
}

function buildFarm() {
  if (money >= farmPrice) {
    money -= farmPrice;
    farms += 1;
    goods += 100; // Each farm produces 100 goods
    farmPrice = Math.round(farmPrice * 1.20); // Increase price by 20%
    console.log("New farm price: " + farmPrice);  // Debugging line
    updateDisplay();
  } else {
    alert("Not enough coins to build a farm!");
  }
}

function updateFarmProduction() {
  // Calculate how many farms can be supported by the current population
  let supportedFarms = Math.floor(population / farmPeopleRequired);

  // Farms can't produce goods unless they are supported by enough population
  let goodsToProduce = Math.min(supportedFarms, farms); // Cannot produce goods if there are not enough farms

  // Add goods produced by the supported farms
  goods += goodsToProduce;

  updateDisplay();
}
setInterval(updateFarmProduction, 1000);

function buildHousingFactory() {
  if (money >= housingFactoryPrice) {
    money -= housingFactoryPrice;
    housingFactories += 1;
    housingFactoryPrice = Math.round(housingFactoryPrice * 1.25); // 25% price increase after each factory
    updateDisplay();
  } else {
    alert("Not enough coins to build a housing factory!");
  }
}

function autoBuildHouses() {
  if (housingFactories > 0) {
    houses += housingFactories;
    population += housingFactories * 5; // Each house adds 5 population
    updateDisplay();
  }
}

// Run this every 15 seconds
setInterval(autoBuildHouses, 10000);

function buildSchool() {
  if (money >= schoolPrice) {
    money -= schoolPrice;
    schools += 1;
    schoolPrice = Math.round(schoolPrice * 1.20); // Increase price by 20%
    console.log("New school price: " + schoolPrice);  // Debugging line
    updateDisplay();
  } else {
    alert("Not enough coins to build a school!");
  }
}

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

  // Optionally, update the displayed prices on the buttons
  document.getElementById("buildHouseButton").textContent = `Build House (${housePrice} coins)`;
  document.getElementById("buildFarmButton").textContent = `Build Farm (${farmPrice} coins)`;
  document.getElementById("buildHousingFactoryButton").textContent = `Build Housing Factory (${housingFactoryPrice} coins)`;
  document.getElementById("buildSchoolButton").textContent = `Build School (${schoolPrice} coins)`;
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
    farms,
    housingFactories,
    schools,
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
    farms = gameData.farms || 0; 
    housingFactories = gameData.housingFactories || 0; 
    schools = gameData.schools || 0; 
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
  farms = 0;
  housingFactories = 0;
  schools = 0;
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
console.log("Money: ", money);
console.log("Housing Factories: ", housingFactories);
console.log("Housing Factory Price: ", housingFactoryPrice);
