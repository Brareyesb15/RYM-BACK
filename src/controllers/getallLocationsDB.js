const axios = require('axios');
const {Location} = require("../DB_connection")

const getAllLocationsDB = async () => {

    try{

       return await Location.findAll()
    }
    catch(error){
        return error.message
    }
}


module.exports = getAllLocationsDB;