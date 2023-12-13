const express = require('express')
const router = express.Router()
const { getItems, getRoute } = require("../public/scripts/databaseConnection.js")
const { container } = require("../public/scripts/cosmosConfig.js");

router.get('/latest', async (req, res) => {
    try{
        const items = await getItems(container);
        res.json(items);
    } catch (error){
        res.status(500).send(error.message);
    }
});

router.get('/route', async (req, res) => {
    try{
        const items = await getRoute(container);
        res.json(items);
    } catch (error){
        res.status(500).send(error.message);
    }
});

module.exports = router