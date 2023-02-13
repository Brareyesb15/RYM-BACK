
const axios = require('axios');
const { Favoritos } = require('../DB_connection')

const deleteFavs = async (id,userID) => {

    try {
      await Favoritos.destroy({
        where: {
          characterId : id,
          UsuarioId : userID
        } 
      
      })
      return "personaje eliminado"
    } catch (error) {
      return (error.message)
    }
  }

  module.exports = deleteFavs;