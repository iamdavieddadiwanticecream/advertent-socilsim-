let goods = 0;
let money = 0;
let taxRate = 0.10;

function produce() {
  goods += 1;
  let tax = Math.floor(1 * taxRate * 100) / 100; // round to 2 decimals
  money += tax;
  updateDisplay();
}

function increaseTax() {
  if (taxRate < 1.0) {
    taxRate += 0.05;
    taxRate = Math.round(taxRate * 100) / 100;
    updateDisplay();
  }
}

function decreaseTax() {
  if (taxRate > 0.05) {
    taxRate -= 0.05;
    taxRate = Math.round(taxRate * 100) / 100;
    updateDisplay();
  }
}

function updateDisplay() {
  document.getElementById("goods").textContent = goods;
  document.getElementById("money").textContent = money.toFixed(2);
  document.getElementById("taxRate").textContent = Math.round(taxRate * 100) + "%";
}
