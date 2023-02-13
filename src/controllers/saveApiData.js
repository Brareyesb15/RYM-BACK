const axios = require("axios");
const { character } = require("../DB_connection.js")

const getApiData = async () => {
  const n = null
  const obtenerID = (url) => {
    if (url){
    let retorno = url.split("/");
    return parseInt(retorno[retorno.length - 1])  
    }//  a esta funcion puedo ponerle un if (url),else "none" para que vaya lleno con algo.
   
  };

  const promises = [];
  for (let i = 1; i <= 42; i++) {
    promises.push(
      axios(`https://rickandmortyapi.com/api/character/?page=${i}`)
    );
  }

  try {
    const results = await Promise.all(promises);
    let requests = [];
    results.forEach((result) => {
      requests.push(...result.data.results);
    });
    let final = n?
      requests.slice(0, n).map((result) => {
      let indCharacter = {};
      indCharacter.id = result.id;
      indCharacter.name = result.name;
      indCharacter.species = result.species;
      indCharacter.status = result.status;
      indCharacter.origin = obtenerID(result.origin.url)
      indCharacter.gender = result.gender;
      indCharacter.image = result.image;
      indCharacter.location= obtenerID(result.location.url);
      return indCharacter;
    }) 
    : requests.map((result) => {
      let indCharacter = {};
      indCharacter.id = result.id;
      indCharacter.name = result.name;
      indCharacter.species = result.species;   //SIDER!!!!!!!!! 
      indCharacter.status = result.status;
      indCharacter.origin = obtenerID(result.origin.url);
      indCharacter.gender = result.gender;
      indCharacter.image = result.image;
      indCharacter.location= obtenerID(result.location.url);
      return indCharacter;
    })

    return final;
  } catch (error) {
    return error.message; 
  }
};

const saveApiData = async() => {   // Va a guardar lo que traigamos de la extracción del API en el backend. 
  const characters = []
  const data = await getApiData()
try {
for (const characterData of data) {  //Algo interesante en esta construcción: Se supone que Allownull:false en la tabla no permite nulls, pero si el null viene del llamado a la función anterior, entra como null, es decir, lo vale y en la tabla hay un null. Preguntar como se resuelve eso,
   console.log(characterData.origin)
  let pj = await character.create({
    id : characterData.id,
    name: characterData.name,
    status: characterData.status,
    species: characterData.species,
    gender: characterData.gender,
    originID: characterData.origin, // si lo pones en null se corta la promesa, si viene en null desde la data, no se frena y lo guarda null. 
    image: characterData.image,
    locationID: characterData.location
   }
   )
  }}
  catch (error) {
    return error.message

  }

}


module.exports = {
  getApiData,
  saveApiData
}

/* Apuntes sobre Concurrencia, promesas, asincronia y blue bird. 

LA REALIDAD ES QUE HAY UN MONTÓN DE FORMAS DE HACER ESA GETAPIDATA.

La más eficiente es la de arriba, el problema? necesitas saber cuantos personajes manda por pagina la API. Aqui concuerdan justo en 100 porque
van de 20 en 20, pero de haber una diferencia habría que cambiar cosas. Duración? 700milisegundos promedio. Qué es lo valioso de este codigo? 
el concepto de guardar en un array las promesas para luego usar mandarlas todas con el promiseAll. 

El código de recursividad también es efectivo, pero no lo amo: duración: 1.5 segundos en promedio.-----------------------------------------------

const axios = require("axios");

async function getApiData(url = "https://rickandmortyapi.com/api/character", characters = [], next = 1) {
  try {
    const { data } = await axios.get(`${url}/?page=${next}`);
    characters.push(...data.results);
    if (characters.length < 100) {
      return getApiData(url, characters, next + 1);
    } else {
      return characters
        .slice(0, 100)
        .map(({ id, name, species, status, origin, gender, image }) => ({
          id,
          name,
          species,
          status,
          origin,
          gender,
          image
        }));
    }
  } catch (error) {
    console.error(error);
  }
}
Este es mi favorito, lo hice enteramente yo y demora 1.8milisegundos:----------------------------------------------------------------------
const axios = require("axios");

const getApiData = async () => {
  const obtenerID = (url) => {
    let retorno = url.split("/");
    return retorno[retorno.length-1];
  };

  let stop = 1;
  let final = [];
  let requests = [];

  while (requests.length<100) {
       const {data} = await axios(`https://rickandmortyapi.com/api/character/?page=${stop}`);
       requests.push(...data.results)
       stop = stop +1;
  }
 try {
    requests.forEach(result => {

      let indCharacter = {};
      indCharacter.id = result.id;                     
      indCharacter.name = result.name;         
      indCharacter.species = result.species;
      indCharacter.status = result.status;
      indCharacter.origin = obtenerID(result.origin.url);
      indCharacter.gender = result.gender;
      indCharacter.image = result.image;
      final.push(indCharacter);
    }) 
    return final }
    catch (error){
        error.message
    }
};
-----------------------------------------------------------------------------------------------------------------------------------------
Tú primer código (la lógica que pretendía hacer, pobre de mi ciego) era uno en el que hacía la petición a la api ID por ID pero resultaba en 45
segundos de espera, imposible para un pedido. Fue ahí cuando encontré la solución de abajo: Concurrencia. 
La concurrencía me permitió hacerle varios llamados a la API a través un bucle for, guardar estos llamados a la API en un array y luego a esos
llamados(Que se hacen todos aútomaticamente) aplicarles un promiseAll, que los trabajaría en orden y de manera rápida, sin esperarse el uno al otro
porque todo quedaría guardado en la cola. En realidad no entiendo completamente que sucede en el fondo, pero entiendo un poco más (al poner en
practica) el tema de la cola Quque de js y las promesas. Total es que el trabajo terminaba haciendose en 3 segundos, fantastico.. 
Pero luego buscando más soluciones encontré la librería Bluebird, que es la del código que usé al final. Blue bird permite trabajar con promesas
de forma más rápida, debido a que utiliza su función.map para trabajar sobre cada uno de los promises antes de que se resuelvan, por lo que
los va trabajando mientras se resuelven todos. Al final devuelve el array final. Investigar más sobre usos de bluebird y PromiseAllSetled. 
ESTE CODIGO ESTÁ MAL PORQUE NO SABÍA EL PAGINADO DE LA API. LECCION IMPORTANTE: LEER LAS APIS COMPLETAS PARA ENTENDERLAS!!!!!!!!
*/ 
/* const axios = require('axios');

const getApiData = async() => {
    const obtenerID = (url)  => {
      let retorno =  url.split("/")
      return retorno[retorno.length-1]
    }
    let id = 1
    let final = []
    let requests = []
  
    for (let i = id; i <= 100; i++) {
      requests.push(axios.get(`https://rickandmortyapi.com/api/character/${i}`))
    }
  
    try {
      let results = await Promise.all(requests)
      results.forEach(result => {
        let indCharacter = {};
        indCharacter.id = result.data.id                     
        indCharacter.name = result.data.name         
        indCharacter.species = result.data.species
        indCharacter.status = result.data.status
        indCharacter.origin = obtenerID(result.data.origin.url)
        indCharacter.gender= result.data.gender
        indCharacter.image= result.data.image;
        final.push(indCharacter)
      })
    
      return final;
    } catch(error) {
      console.log(error)
      return error.message
    }
  }*/

  /* ----------------------------------------------------------------------------------------------------------------------------
  Sobre findOrCreate y Spread.

Spread sirve para descomponer los resultados de una promesa, en este caso. El método findOrCreatecreará una entrada en la tabla a menos que pueda encontrar una que cumpla con las opciones de consulta. En ambos casos, devolverá una instancia (ya sea la instancia encontrada o la instancia creada) y un valor booleano que indica si esa instancia se creó o ya existía. Entonces .Spread permite obtener estos dos valores sin desestructurar, 
  
  */