const express = require('express')
const app = express()
const dataRoute = require('./routes/data.js')
const path = require('path')

app.use('/data', dataRoute)
app.use(express.static(__dirname + '/public'));
app.use('/scripts',express.static(path.join(__dirname, 'public/scripts')));

const port = process.env.PORT || 3000;
app.listen(port);