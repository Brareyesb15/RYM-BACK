const {Router} = require("express");
const favRouter = require("./favRouter.js")
const allRouter = require("./allCharRouter.js")
const userRouter = require("./userRouter.js")


const mainRouter = Router();    

mainRouter.get("/rickandmorty", (req,res) => {
    console.log
    res.status(200).json("estamos en rickandmorty")
})

mainRouter.use("/fav", favRouter)
mainRouter.use("/all", allRouter)
mainRouter.use("/user", userRouter)


module.exports = mainRouter;