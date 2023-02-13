
const axios = require('axios');


const getCharById = async (id) => {

    const obtenerID = (url) => {
     if (url) {
        let retorno = url.split("/");
        return retorno[retorno.length - 1]}
        return "none" 
      };
    try {

   let info = await axios.get(`https://rickandmortyapi.com/api/character/${id}`); 
        let personaje = {
            id : info.data.id,
            name : info.data.name,
            species :info.data.species,
            status : info.data.status,
            origin : obtenerID(info.data.origin.url),
            gender :info.data.gender,
            image : info.data.image,
        };
       
   return personaje;
}
    catch(error) {
        return error.message
     };
}



module.exports = 
    getCharById;

