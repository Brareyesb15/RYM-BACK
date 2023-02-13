const express = require("express");
const morgan = require("morgan"); // middleware que te da informacion por consola cuando se haga una solicitud. 
const mainRouter = require("./routes/Routes.js") // te falta crear main router y exportarla 
const bodyParser = require ("body-parser")
const {saveApiData} = require("./controllers/saveApiData")
const saveApiLocations = require("./controllers/saveApiLocations")
const {sequelize} = require ("./DB_connection.js")


const server= express();  

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*"); //Autorizo recibir solicitudes de este dominio
    res.header('Access-Control-Allow-Credentials', true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //Autorizo recibir solicitudes con dichos hedears
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next();
});

server.use(morgan("dev"));

server.use(express.json());

sequelize.sync({ force: true }).then(() => {
    saveApiData(),
    saveApiLocations();
})

server.use(mainRouter); // te permite modularizar tus routes.

module.exports = server; 




