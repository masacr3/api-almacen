const { response } = require("express")
const express = require("express")
const router = express.Router()
var fs = require("fs")
const path = "/verduleria"

router.get(path, (request, response)=>{
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    let filtramosProducto = archivo.filter(linea => linea.split(",")[2] == "verduleria")
    let articulos = []
    filtramosProducto.forEach(item=>{
        let data = {}
        data.cod = item.split(",")[0]
        data.producto = item.split(",")[1]
        data.marca = item.split(",")[2]
        data.descripcion = item.split(",")[3]
        data.precio = item.split(",")[4]
        data.preciop = item.split(",")[5]
        articulos.push(data)
    })
    response.send( { verduras : articulos })
})

module.exports = router