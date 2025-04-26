let educationPercent = 0;

function updateEducation() {
  const requiredSchools = Math.ceil(population / 300);
  if (requiredSchools === 0) {
    educationPercent = 0;
  } else {
    educationPercent = Math.min(100, Math.floor((schools / requiredSchools) * 100));
  }
}

let tax = baseTax * (educationPercent >= 100 ? 2 : 1);

function getInterval(base) {
  return educationPercent >= 100 ? base / 2 : base;
}

setInterval(updateStuff, getInterval(1000));
