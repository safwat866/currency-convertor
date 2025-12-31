function fetchData() {
    fetch(
      "https://v6.exchangerate-api.com/v6/0d173ea7ab51b738ea3e6f72/latest/USD"
    ).then(res => res.json())
    .then(data => {
        console.log(Object.keys(data.conversion_rates));
        showCurrencyInDom(Object.keys(data.conversion_rates));
    })
}

function showCurrencyInDom(keys) {
    let select1 = document.getElementById("currency-from");
    let select2 = document.getElementById("currency-to");
    
    keys.forEach((item) => {
        let child = document.createElement("option");
        child.setAttribute('value', item);
        child.textContent = item;
        select1.appendChild(child);
        select2.appendChild(child.cloneNode(true));
    })
}

function showCalculatedAmountInDom(unit1, unit2,amount, finalAmount) {
    if (document.querySelector(".result")) {
        document.querySelector(".result").remove();
    }
    let child = document.createElement("h3");
    child.classList.add("result");
    child.innerHTML = `<span>${amount}</span> ${unit1} = <span>${finalAmount.toFixed(2)}</span> ${unit2}`;
    document.getElementById("amount").after(child);
}

function calculateAmount(data,unit1,unit2,amount) {
    let finalAmount = amount * data[unit2];
    showCalculatedAmountInDom(unit1,unit2,amount,finalAmount)
}

function convertCurrency(unit1,unit2,amount) {
    fetch(
      "https://v6.exchangerate-api.com/v6/0d173ea7ab51b738ea3e6f72/latest/" +
        unit1
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.conversion_rates);
        calculateAmount(data.conversion_rates,unit1,unit2,amount);
      });
}

function submitForm() {
    let currencyFrom = document.getElementById("currency-from").value;
    let currencyTo = document.getElementById("currency-to").value;
    let amount = document.getElementById("amount").value;
    // validate data
    if (currencyFrom != "" && currencyTo != "" && amount != "") {
      convertCurrency(currencyFrom, currencyTo,amount);
    } else {
      alert("please choose unit and amount to convert");
    }
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
})

fetchData()