const axios = require("axios");
const { Location } = require("../DB_connection.js")

const getApiLocations = async () => {
  
  const promises = [];
  for (let i = 1; i <= 7; i++) {
    promises.push(
      axios(`https://rickandmortyapi.com/api/location?page=${i}`)
    );
  }

  try {
    const results = await Promise.all(promises);
    let requests = [];
    results.forEach((result) => {
      requests.push(...result.data.results);
    });
    
    let final = requests.map((result) => {
      let indLocation = {};
      indLocation.id = result.id;
      indLocation.name = result.name;
      indLocation.type = result.type;   //SIDER!!!!!!!!! 
      indLocation.dimension = result.dimension;
 
      return indLocation;
    })

    return final;
  } catch (error) {
    return error.message; 
  }
};

const saveApiLocations = async() => {   // Va a guardar lo que traigamos de la extracción del API en el backend. 
  const data = await getApiLocations()
try {
for (const characterData of data) {  //Algo interesante en esta construcción: Se supone que Allownull:false en la tabla no permite nulls, pero si el null viene del llamado a la función anterior, entra como null, es decir, lo vale y en la tabla hay un null. Preguntar como se resuelve eso,
   let pj = await Location.create({
        id : characterData.id,
      name : characterData.name,
      type : characterData.type,   //SIDER!!!!!!!!! 
      dimension : characterData.dimension
   }
   )
  } return Location.findAll()
}
  catch (error) {
    return error.message

  }

}



module.exports = saveApiLocations