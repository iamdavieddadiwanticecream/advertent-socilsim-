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
    updateDisplay();
  } else {
    alert("Not enough coins to build a house!");
  }
}

function buildFarm() {
  if (money >= farmPrice) {
    money -= farmPrice;
    farms += 1;
    farmPrice = Math.round(farmPrice * 1.20); // Increase price by 20%
    updateDisplay();
  } else {
    alert("Not enough coins to build a farm!");
  }
}

function updateFarmProduction() {
  let supportedFarms = Math.floor(population / farmPeopleRequired);
  let goodsToProduce = Math.min(supportedFarms, farms);
  goods += goodsToProduce * 100 * getEducationBuff();
  updateDisplay();
}
setInterval(updateFarmProduction, 1000);

function buildHousingFactory() {
  if (money >= housingFactoryPrice) {
    money -= housingFactoryPrice;
    housingFactories += 1;
    housingFactoryPrice = Math.round(housingFactoryPrice * 1.25); // 25% price increase
    updateDisplay();
  } else {
    alert("Not enough coins to build a housing factory!");
  }
}

function autoBuildHouses() {
  if (housingFactories > 0) {
    houses += housingFactories;
    population += housingFactories * 5;
    updateDisplay();
  }
}
setInterval(autoBuildHouses, 10000); // Runs every 10 seconds

function buildSchool() {
  if (money >= schoolPrice) {
    money -= schoolPrice;
    schools += 1;
    schoolPrice = Math.round(schoolPrice * 1.20); // Increase price by 20%
    updateDisplay();
  } else {
    alert("Not enough coins to build a school!");
  }
}

function getEducationBuff() {
  return schools > 0 ? 2 : 1;
}

function produce() {
  if (stability <= 20) {
    alert("The people are too unhappy to work!");
    return;
  }

  let educationBuff = getEducationBuff();
  goods += educationBuff;
  let tax = parseFloat(taxRate.toFixed(2)) * educationBuff;
  money += tax;
  updateDisplay();
}
setInterval(produce, 5000); // Now actually runs every 5s

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
  document.getElementById("money").textContent = money.toFixed(2).toLocaleString();
  document.getElementById("taxRate").textContent = Math.round(taxRate * 100) + "%";
  document.getElementById("population").textContent = population.toLocaleString();
  document.getElementById("houseCount").textContent = houses.toLocaleString();
  document.getElementById("stability").textContent = stability + "%";
  document.getElementById("farmCount").textContent = farms.toLocaleString();
  document.getElementById("housingFactoryCount").textContent = housingFactories.toLocaleString();
  document.getElementById("schoolCount").textContent = schools.toLocaleString();
  document.getElementById("educationPercent").textContent =`${Math.round((getEducationBuff() - 1) * 100)}%`;
  document.getElementById("buildHouseButton").textContent = `Build House (${housePrice} coins)`;
  document.getElementById("buildFarmButton").textContent = `Build Farm (${farmPrice} coins)`;
  document.getElementById("buildHousingFactoryButton").textContent = `Build Housing Factory (${housingFactoryPrice} coins)`;
  document.getElementById("buildSchoolButton").textContent = `Build School (${schoolPrice} coins)`;
}

function updateStability() {
  let target = Math.max(0, 100 - Math.floor(taxRate * 100 * 1.5));
  if (stability > target) {
    stability -= 1;
  } else if (stability < target) {
    stability += 1;
  }
  updateDisplay();
}
setInterval(updateStability, 2500);

setInterval(() => {
  if (stability > 20) {
    let autoProduced = Math.floor(population / 10);
    if (autoProduced > 0) {
      let buff = getEducationBuff();
      goods += autoProduced * buff;
      let tax = parseFloat((autoProduced * taxRate * buff).toFixed(2));
      money += tax;
      updateDisplay();
    }
  }
}, 1000);

function getEducationBuff() {
  const schoolsNeeded = population / 300;

  if (schoolsNeeded === 0) return 1;

  if (schools >= schoolsNeeded) return 2;

  return 1 + (schools / schoolsNeeded); // Scales between 1.0 and 2.0
}

setInterval(() => {
  const maxPopulation = houses * 5;

  if (stability > 20 && population < maxPopulation) {
    population += 10; // One person is born
    updateDisplay();
  }
}, 1000); // Every 1 seconds (adjust if needed)

console.log("Tax collected:", tax, "Buff:", getEducationBuff());

setInterval(() => {
  const maxPopulation = houses * 5;

  if (stability > 20 && population < maxPopulation) {
    population += 1; // One person born every cycle
    updateDisplay();
  }
}, 5000); // Every 5 seconds (you can adjust this)


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
    housePrice,
    farmPrice,
    housingFactoryPrice,
    schoolPrice,
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
    housePrice = gameData.housePrice || 10;
    farmPrice = gameData.farmPrice || 200;
    housingFactoryPrice = gameData.housingFactoryPrice || 5000;
    schoolPrice = gameData.schoolPrice || 30;
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
  housePrice = 10;
  farmPrice = 200;
  schoolPrice = 30;
  housingFactoryPrice = 5000;
  updateDisplay();
}
  
