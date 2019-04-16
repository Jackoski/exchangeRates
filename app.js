const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')
const rp = require('request-promises')

const app = express()




// setting JSON parser
app.use(express.json())


// getting and rendering exchange rate from nbp api

app.get("/", async (req, res) => {
    let rates
    const uri = 'http://api.nbp.pl/api/exchangerates/tables/a?format=json' //requesting whole data
    const getRates = {
        uri,
        json: true //parsing it to json if before parsing goes wrong
    }

    await rp(getRates).then((exchangeRates) => { //getting whole data using request-promises
        rates = exchangeRates.body[0].rates //saveing it to rates variable
    }).catch(err => {
        res.status(500).send({
            error: 'something went wrong, try again later' //catching error
        })
    })

    res.send(rates)
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('server is working!')
})