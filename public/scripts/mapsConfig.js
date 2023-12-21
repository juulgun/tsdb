require('dotenv').config()

function getKey(){
    return process.env.MAPS_API;
}


module.exports = {getKey}