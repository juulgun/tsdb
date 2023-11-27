const express = require('express')
const app = express()
const dataRoute = require('./routes/data.js')
const fillDatabase = require('./fillDatabase.js')

app.use(express.static("public"))
app.use('/data', dataRoute)

app.listen(8080)
