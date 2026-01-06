const select1 = document.getElementById("currency-from");
const select2 = document.getElementById("currency-to");

function fetchData() {
  fetch(
    "https://v6.exchangerate-api.com/v6/0d173ea7ab51b738ea3e6f72/latest/USD"
  )
    .then((res) => res.json())
    .then((data) => {
      showCurrencyInDom(Object.keys(data.conversion_rates));
    });
}

function showCurrencyInDom(keys) {
  keys.forEach((item) => {
    let child = document.createElement("option");
    child.setAttribute("value", item);
    child.textContent = item;
    select1.appendChild(child);
    select2.appendChild(child.cloneNode(true));
  });
}

function showCalculatedAmountInDom(unit1, unit2, amount, finalAmount) {
  if (document.querySelector(".result")) {
    document.querySelector(".result").remove();
  }
  let child = document.createElement("h3");
  child.classList.add("result");
  child.innerHTML = `<span>${amount}</span> ${unit1} = <span>${finalAmount.toFixed(
    2
  )}</span> ${unit2}`;
  document.getElementById("amount").after(child);
}

function calculateAmount(data, unit1, unit2, amount) {
  let finalAmount = amount * data[unit2];
  showCalculatedAmountInDom(unit1, unit2, amount, finalAmount);
}

function convertCurrency(unit1, unit2, amount) {
  fetch(
    "https://v6.exchangerate-api.com/v6/0d173ea7ab51b738ea3e6f72/latest/" +
      unit1
  )
    .then((res) => res.json())
    .then((data) => {
      calculateAmount(data.conversion_rates, unit1, unit2, amount);
    });
}

function submitForm() {
  const amount = document.getElementById("amount").value;
  // validate data
  if (select1.value != "" && select2.value != "" && amount != "") {
    if (amount > 0) {
      convertCurrency(select1.value, select2.value, amount);
    } else {
      alert("amount should be greeter than 0");
    }
  } else {
    alert("please choose unit and amount to convert");
  }
}

function swapUnits() {
  if (!select1.value || !select2.value) {
    return;
  }
  [select1.value, select2.value] = [select2.value, select1.value];
  select1.dispatchEvent(new Event("change"));
  select2.dispatchEvent(new Event("change"));
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

document.getElementById("swap").addEventListener("click", () => {
  swapUnits();
});

fetchData();
