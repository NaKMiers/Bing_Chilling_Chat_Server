require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const ConnectDatabase = require('./config/database')
const PORT = process.env.PORT

// express instance
const app = express()

// public folder
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// apply middlewares
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }))
app.use(bodyParser.json({ limit: '25mb', extended: true }))
app.use(cors())

// apply routes
routes(app)

// config database
ConnectDatabase()

// app listening
app.listen(PORT, () => console.log('Server listening on port: ', PORT))

// heroku security code
// 7K2044RRYN
// 7TBMO5WSYC
// OA5HK6W8GY
// BMBXROVL45
// 00B1NRQ5SU
// FH2RVEKKEI
// 9B2QC7KY1Q
// IWUBKR1GPE
// 28GJJ5TK83
// TH7QILN07N
