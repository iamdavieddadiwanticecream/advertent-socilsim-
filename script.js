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
}
