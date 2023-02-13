const server = require("./src/app")
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
