var path = __dirname
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var io = new Server(server);

module.exports = {path , io }

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

app.use(express.static(__dirname + "/public"));

const productos = require("./routes/productos")
const obtenerpdf = require("./routes/pdf")
const obtenerhome = require("./routes/home")
const obtenertiket = require("./routes/tiket")
const obtenerverduleria = require("./routes/verduleria")
const obtenerpedido = require("./routes/pedidos")

app.use(productos)
app.use(obtenerpdf)
app.use(obtenerhome)
app.use(obtenertiket)
app.use(obtenerverduleria)
app.use(obtenerpedido)

const port = 3000

io.on('connection', (socket) => {
    console.log('a user connected');
});
  

server.listen(port,"0.0.0.0",()=>{
    console.log("Servidor activo")
})

