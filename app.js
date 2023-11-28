const express = require('express')
const app = express()
const dataRoute = require('./routes/data.js')
const path = require('path')
const table = require('./public/scripts/fillTable.js')

app.use('/data', dataRoute)
app.use(express.static(__dirname + '/public'));

table.fillTable();

app.listen(8080)
