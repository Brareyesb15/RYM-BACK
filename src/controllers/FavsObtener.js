
  const { character,Favoritos,Usuario } = require('../DB_connection')

const obtenerFav = async (id) => {

    try {
              const user = await Usuario.findByPk(id, {
                include: character
              });
          
      return user.characters     
    } catch (error) {
      return (error.message)
    }
  }

  module.exports = obtenerFav;


  // En este código está la clave para buscar en tablas relacionadas <3 
// RELACION MUCHOSXMUCHOS : Usuario y Characters son tablas relacionadas, por lo tanto si agrego el include, me va a traer todos los caracters que este usuario tiene creado. 