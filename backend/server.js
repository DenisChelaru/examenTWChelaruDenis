const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const controller = require('./controller')

const app = express()
app.use(cors())
app.use(bodyParser.json())

async function startServer(port) {
    if(!(await controller.connected)) {
        console.log('Database couldn\'t be loaded')
        return
    }
    console.log('Database loaded')

    app.get("/movie/:id", controller.getMovieById)
    app.post("/movie", controller.getMovie)
    app.post("/newmovie", controller.postMovie)
    app.put("/movie/:id", controller.putMovie)
    app.delete("/movie/:id", controller.deleteMovie)

    app.get("/member/:id", controller.getMemberById)
    app.post("/member", controller.getMember)
    app.post("/newmember", controller.postMember)
    app.put("/member/:id", controller.putMember)
    app.delete("/member/:id", controller.deleteMember)
    
    app.listen(port, () => console.log(`Server listening on port ${port}`))
}

startServer(8080)