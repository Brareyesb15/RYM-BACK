const {Router} = require("express")
const findUserDB = require("../controllers/DBverifyUser")
const postUserDB = require("../controllers/DBpostUser")

const userRouter = Router();

userRouter.post("/validate", async(req,res) => {
    const {email,password} = req.body;
    console.log(email,password)
    const result = await findUserDB(email,password);
    console.log(result)
    try{
       res.status(200).json({id : result}) // estás enfrascado acá, intentando sacarle el ID al usuario para guardar sus favoritos. 
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

userRouter.post("/", async(req,res) =>{

    const {email,password,username} = req.body;
    

    try{
        const result = await postUserDB(email,password,username);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send(error.message)
    }



})

module.exports = userRouter;