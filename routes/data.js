const express = require('express')
const router = express.Router()
const { getItems, getRoute } = require("../public/scripts/databaseConnection.js")
const { container } = require("../public/scripts/cosmosConfig.js");
const { getKey } = require('../public/scripts/mapsConfig.js');

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

router.get('/key', async (req, res) => {
    try{
        const key = getKey();
        res.json(key);
    } catch (error){
        res.status(500).send(error.message);
    }
});

module.exports = router