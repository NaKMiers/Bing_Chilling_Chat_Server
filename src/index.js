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
