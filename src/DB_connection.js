require('dotenv').config();
const { Sequelize, Op} = require('sequelize');
const modelCharacter = require ("./models/Character.js")
const modelUsuario = require ("./models/Users.js")
const modelLocation = require ("./models/Locations")
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;


/*
EJERCICIO 01
A la instancia de Sequelize le falta la URL de conexión.
Recuerda pasarle la información de tu archivo '.env'.

URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
*/
/* const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
   // URL
   { 
   logging: false, 
   native: false 
}
); */


const sequelize = new Sequelize(DB_DEPLOY,
   { 
   logging: false, 
   native: false 
}
);

/*
EJERCICIO 03
Debajo de este comentario puedes ejecutar la función de los modelos.
*/

modelCharacter(sequelize);
modelUsuario(sequelize);
modelLocation(sequelize)

const { character, Usuario, Location } = sequelize.models;  

character.belongsTo(Location,{
   foreignKey: 'locationID',
   as: 'location'
 })
character.belongsTo(Location,{
   foreignKey: 'originID',
   as: 'origin'
 });

character.belongsToMany(Usuario, { through: "Favoritos",unique:false });
Usuario.belongsToMany(character, { through: "Favoritos", unique:false});

module.exports = {
   ...sequelize.models,
   sequelize,
   Op
};
