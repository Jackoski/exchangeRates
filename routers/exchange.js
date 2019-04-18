const express = require('express')
const router = express.Router()
require('request')
const rp = require('request-promises')

// getting data from api and rendering it
router.get("/", async (req, res) => {
    try {
        let currencyRates
        let ratesTable
        let ratesDate
        const uri = 'http://api.nbp.pl/api/exchangerates/tables/a?format=json' //requesting whole data from api
        const getRates = {
            uri,
            json: true //parsing it to json if before parsing goes wrong
        }

        await rp(getRates).then((exchangeRates) => { //getting whole data using request-promises
            currencyRates = exchangeRates.body[0].rates //saving rates to variable
            ratesTable = exchangeRates.body[0].table //saving exchange table to variable
            ratesDate = exchangeRates.body[0].effectiveDate //saving date to variable
        }).catch(err => {
            res.status(500).send({
                error: 'something went wrong, try again later' //catching error
            })
        })
        currencyRates.forEach(rate => {

            if (rate.currency === 'rand (Republika Południowej Afryki)') { //changing rand name to shorter 
                rate.currency = "rand (RPA)"
            }
            if (rate.currency === 'won południowokoreański') { //changing won currency for shorter name
                rate.currency = "won (Korea Płd.)"
            }
        });
        res.render('index/index', { //rendering page and sending via handlebar data
            currencyRates,
            ratesDate,
            ratesTable
        })
    } catch (err) {
        console.log(err)
    }

})


// 404 page

router.get('*', (req, res) => {
    res.status(404).send('&nbsp &nbsp  ¯\\_(ツ)_/¯ 404 Page not found...');
});


module.exports = router