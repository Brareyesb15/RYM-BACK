const axios = require("axios");
const { Usuario } = require("../DB_connection.js")

const findUserDB = async (email, password) => {
  const result = await Usuario.findOne({ where: {
    email: email,
    password: password
  }});

  try {
    if (result) {
      return result.id;
    } else {
      return false;
    }
  } catch (error) {
    return error.message;
  }}
module.exports = findUserDB;