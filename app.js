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

const productos = require("./routes/productos")
const obtenerpdf = require("./routes/pdf")
const obtenerhome = require("./routes/home")
const obtenertiket = require("./routes/tiket")
const obtenerverduleria = require("./routes/verduleria")

app.use(productos)
app.use(obtenerpdf)
app.use(obtenerhome)
app.use(obtenertiket)
app.use(obtenerverduleria)

const port = 3000

app.listen(port,"0.0.0.0",()=>{
    console.log("Servidor activo")
})