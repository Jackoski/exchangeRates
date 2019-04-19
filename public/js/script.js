const currencyCode = [...document.querySelectorAll('.foreginCurrencyName')]
const currencyValue = [...document.querySelectorAll('.foreginQuantity')]
const resultToExchange = document.querySelector('.resultToExchange')
const plnToExchange = document.querySelector('.plnToExchange')
const selectedCurrency = document.querySelector('.selectedCurrency')

// currency exchange calculator

let selectedRate
let selectedPlnValue
let currencyRates = [{}]

// connecting currency code with rates
for (let i = 0; i < currencyCode.length; i++) {
    currencyRates[i] = {
        code: currencyCode[i].textContent,
        value: currencyValue[i].textContent
    }
}

// calc value beetwen PLN and choosen currency

selectedCurrency.addEventListener('change', () => {
    selectedRate = selectedCurrency.value
    currencyRates.forEach((rate) => {
        if (rate.code == selectedRate) {
            plnToExchange.value = (resultToExchange.value * rate.value).toFixed(2);
        }
    })
})

plnToExchange.addEventListener('change', () => {
    currencyRates.forEach((rate) => {
        if (rate.code == selectedRate) {
            resultToExchange.value = (plnToExchange.value / rate.value).toFixed(2);
        }
    })
})

resultToExchange.addEventListener('change', () => {
    currencyRates.forEach((rate) => {
        if (rate.code == selectedRate) {
            plnToExchange.value = (resultToExchange.value * rate.value).toFixed(2);
        }
    })
})