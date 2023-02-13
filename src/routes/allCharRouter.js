const {Router} = require("express")
const getAllCharsDB = require("../controllers/getallcharsDB")
let getCharById = require("../controllers/getCharByIdAPI")
let getCharacterDetail = require("../controllers/getCharDetailAPI")
let {getApiData,saveApiData} = require("../controllers/saveApiData")
let findCharbyid = require("../controllers/DBfindchar")
let getAllLocationsDB = require("../controllers/getallLocationsDB")
const saveApiLocations = require("../controllers/saveApiLocations")
const findLocationByID = require("../controllers/DBfindLocation")
const {  Location } = require("../DB_connection.js")

const allRouter = Router();

allRouter.get("/", async(req,res) => { // from db
    
    const devolver = await getAllCharsDB()

    try{
        res.status(200).send(devolver)
    }
    catch(error){
        res.status(400).send(error.message)
    }

})

allRouter.get("/locations", async(req,res) => { // from db
    
    const devolver = await saveApiLocations()
   

    try{
        res.status(200).send(devolver)
    }
    catch(error){
        res.status(400).send(error.message)
    }

})

allRouter.get("/onsearch/:id", async(req,res) =>{
    let {id} = req.params;
   const result = await getCharById(id);
   try{
    res.status(200).json(result)
   }
   catch(error){
    res.status(400).send(error.message)
   }
})
allRouter.get("/detail/:id", async (req,res) => {
    let {id} = req.params;
    const resulta = await getCharacterDetail(id);
    try{
     res.status(200).json(resulta)
    }
    catch(error){
     res.status(400).send(error.message)
    }
 })

 allRouter.get("/apidata", async (req,res) => {
    const results = await getApiData()
  
    try{
        res.status(200).send(results);
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
allRouter.get("/dbdata/:id",async(req,res)=>{
    const{id} = req.params;
    const results = await findCharbyid(id)
    try{
        res.status(200).send(results);
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
allRouter.get("/findLocation/:id", async(req,res)=>{
    
    const {id} = req.params;
    try {
        const resultaaa = await findLocationByID(id);
        res.status(200).send(resultaaa);
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
allRouter.get("/allLocation", async(req,res) => {
    const results = await Location.findAll();
    res.status(200).send(results)
})
module.exports = allRouter;