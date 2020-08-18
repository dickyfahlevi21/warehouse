const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
const port = 3000

const routeIndex = require('./src/routes/index')
const routeUser = require('./src/routes/users')
const routeProduct = require('./src/routes/products')
const routeJwt = require('./src/routes/jwts')
const dotenv = require('dotenv')

dotenv.config();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())

app.use('/', routeIndex)
app.use('/user', routeUser)
app.use('/product', routeProduct)
app.use('/jwt', routeJwt)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})