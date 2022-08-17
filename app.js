const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()


app.use(
    bodyParser.json({
        limit:"20mb"
    })
)

app.use(
    bodyParser.urlencoded({
        limit:"20mb",
        extended:true
    })
)

app.use(cors())

const cargarproducto = require("./routes/cargarproducto")
const obtenerproducto = require("./routes/obtenerproductos")
app.use(cargarproducto)
app.use(obtenerproducto)

const port = 3000

app.listen(port,"0.0.0.0",()=>{
    console.log("Servidor activo")
})