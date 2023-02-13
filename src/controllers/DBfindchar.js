const axios = require("axios");
const { character, Location } = require("../DB_connection.js")

const findCharbyid = async(id) => {
 const result = await character.findByPk(id, {
    include: [
        {
          model: Location,
          as: 'location'     //// FUNCION BUSQUEDA UNOXMUCHOS. Busca por ID y le pide que incluya, según la FK, la info de la tabla relacionada. 
        },
        {
            model: Location,
            as: "origin"
        }
      ]
 })
try{
    return result
}
catch(error){
return `no se encontró el personaje con el id ${id}`
}
}

module.exports = findCharbyid;