
const axios = require('axios')


const getCharacterDetail = async (id) =>{
        try {
          const data = await axios(`https://rickandmortyapi.com/api/character/${id}`)
        
          
          const character = {
            image: data.data.image,
            name: data.data.name,
            gender: data.data.gender,
            species: data.data.species,
            id: data.data.id,
            status: data.data.status,
            origin: data.data.origin,
          }
        return character
        }
      catch(error){
        return error.message };
  };


module.exports = 
    getCharacterDetail;