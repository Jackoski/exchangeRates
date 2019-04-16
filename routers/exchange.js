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
            currencyRates = exchangeRates.body[0].rates //saveing rates to variable
            ratesTable = exchangeRates.body[0].table //saveing exchange table to variable
            ratesDate = exchangeRates.body[0].effectiveDate //saveing date to variable
        }).catch(err => {
            res.status(500).send({
                error: 'something went wrong, try again later' //catching error
            })
        })
        res.render('index/index', { //rendering page and sending via handlebar data
            currencyRates,
            ratesDate,
            ratesTable
        })
    } catch (err) {
        console.log(err)
    }

})

module.exports = router