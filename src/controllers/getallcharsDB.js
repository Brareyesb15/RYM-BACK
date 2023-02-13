const axios = require('axios');
const {character,Location} = require("../DB_connection")

const getAllCharsDB = async () => {

    const allChar = await character.findAll({
    }
 )
    try{

       return allChar
    }
    catch(error){
        return error.message
    }
}


module.exports = getAllCharsDB;