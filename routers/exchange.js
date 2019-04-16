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
        const uri = 'http://api.nbp.pl/api/exchangerates/tables/a?format=json' //requesting whole data
        const getRates = {
            uri,
            json: true //parsing it to json if before parsing goes wrong
        }

        await rp(getRates).then((exchangeRates) => { //getting whole data using request-promises
            currencyRates = exchangeRates.body[0].rates //saveing it to rates variable
            ratesTable = exchangeRates.body[0].table //saveing it to rates variable
            ratesDate = exchangeRates.body[0].effectiveDate //saveing it to rates variable
        }).catch(err => {
            res.status(500).send({
                error: 'something went wrong, try again later' //catching error
            })
        })
        console.log(currencyRates)
        res.render('index/index', {
            currencyRates,
            ratesDate,
            ratesTable
        })
    } catch (err) {
        console.log(err)
    }

})

module.exports = router