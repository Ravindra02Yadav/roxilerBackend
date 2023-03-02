require('dotenv').config()
const express = require("express")
const { connection } = require("./config/db")
const {noteRouter} = require('./routes/route')
const app = express()

app.use(express.json())
app.use("/" , noteRouter)

app.get("/", (req, res) => {

    res.send({ "msg": "Welcome" })
})

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB Successfully")
        console.log(`Listening on port ${process.env.port}`)

    }
    catch (err) {
        console.log("Connection to DB failed")
        console.log(err)
    }
    
})


