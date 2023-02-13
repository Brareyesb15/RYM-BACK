const axios = require("axios");
const { Op, character, Location } = require("../DB_connection.js")

const findLocationByID= async(id) => {
    try {
    const location = await Location.findByPk(id);
    const characters = await character.findAll({
    where: {
    [Op.or]: [{ locationID: location.id }, { originID: location.id }]
    },
    include: [
    { model: Location, as: "location" },   // FUNCION DE BUSQUEDA EN TABLAS UNOXMUCHOS. BUSCA UNO EN UNA TABLA, SACA ESE ID, BUSCA EN LA OTRA TODOS LOS QUE TENGAN ESE ID. 
    { model: Location, as: "origin" }
    ]
    })
    return  {location,characters};
    } catch (error) {
    return error.message
    }
    };

module.exports = findLocationByID;