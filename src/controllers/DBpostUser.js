const { Usuario } = require("../DB_connection.js")

const postUserDB = async(email,password,username) => {
 
try{
  const result = await Usuario.create({
    email: email,
    password: password,
    username: username
 })
  return "Usuario creado satisfactoriamente"
}
catch(error){
return error.message
}
}

module.exports = postUserDB;