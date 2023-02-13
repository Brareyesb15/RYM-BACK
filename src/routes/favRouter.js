const {Router} = require("express")
const addFavos = require("../controllers/FavsAdd")
const deleteFavs = require("../controllers/FavsDelete")
const obtenerFav = require("../controllers/FavsObtener")


const favRouter = Router()

favRouter.get("/obtener/:id", async(req,res) => {
    const {id} = req.params;
    try{
        const result = await obtenerFav(id)
        return res.status(200).send(result)
    }
    catch(error){
        return res.status(400).send(error.message)
    }
})

favRouter.post("/add", async(req,res) => {
    const {id,userID} = req.body;
   
    try {  
    const resultAdd = await addFavos(id,userID)  
     return res.status(200).send(resultAdd) 
     } catch (error){
    return res.status(400).send(error.message)
   }
})
    
favRouter.delete("/delete", async(req,res) => {
    const {id,userID}= req.query;
    console.log("!!",id,userID)
    try {  
        const resultDelete = await deleteFavs(id,userID);
        return res.status(200).send(resultDelete)
    } catch (error){
      return res.status(400).send(error.message)
    }
})  
       
module.exports = favRouter;