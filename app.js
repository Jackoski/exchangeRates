const express = require('express')
const exphbs = require('express-handlebars')
const routerExchange = require('./routers/exchange')
const path = require('path')

const app = express()

// handlebars middelware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// setting JSON parser
app.use(express.json())

// setting path route to public folder
app.use(express.static(path.join(__dirname, 'public')))


// setting exchange rates router
app.use(routerExchange)




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('server is working!')
})