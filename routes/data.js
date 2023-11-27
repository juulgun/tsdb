const express = require('express')
const router = express.Router()
const { getItems } = require("../databaseConnection.js")
const { container } = require("../cosmosConfig.js")


router.get('/', async (req, res) => {
    try{
        const items = await getItems(container);
        res.json(items)
    } catch (error){
        res.status(500).send(error.message);
    }
});

module.exports = router