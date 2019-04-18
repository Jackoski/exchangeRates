const currencyCode = [...document.querySelectorAll('.foreginCurrencyName')]
const currencyValue = [...document.querySelectorAll('.foreginQuantity')]
const resultToExchange = document.querySelector('.resultToExchange')
const plnToExchange = document.querySelector('.plnToExchange')
const selectedCurrency = document.querySelector('.selectedCurrency')
const linkedin = document.querySelector('.social1')
const github = document.querySelector('.social2')
const gmail = document.querySelector('.social3')
const faccebook = document.querySelector('.social4')

// links social icons to pages

linkedin.addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/jacek-majda-aab81b17b/', '_blank');
})
github.addEventListener('click', () => {
    window.open('https://github.com/Jackoski', '_blank');
})
gmail.addEventListener('click', () => {
    window.open("mailto:mail@example.org", '_blank');
})
faccebook.addEventListener('click', () => {
    window.open('https://www.facebook.com/jacek.majda', '_blank');
})

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