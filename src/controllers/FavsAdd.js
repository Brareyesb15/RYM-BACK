
const axios = require('axios');
const { Favoritos, character } = require('../DB_connection')



const addFavos = async(id,userID) =>{

  try {
 await Favoritos.create({
  characterId : id,
  UsuarioId : userID
 })
  
     return "personaje creado";
      }
      catch (error){
        return error.message
      }
  }





module.exports = addFavos;

