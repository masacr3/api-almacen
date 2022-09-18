const { response } = require("express")
const express = require("express")
const router = express.Router()
var fs = require("fs")
const pathObtenerProductos = "/obtenerproducto"
const pathObtenerProducto = "/obtenerproducto/:cod"

router.get(pathObtenerProductos,(request, response)=>{
    var archivo = fs.readFileSync("./bd.csv","utf-8")
    var data = []
    archivo.split("\n").map(linea=> linea.split(",")).forEach(item=>{
        if(item[0] !== ""){
            obj = {}
            obj.cod = item[0]
            obj.producto = item[1]
            obj.marca = item[2]
            obj.descripcion = item[3]
            obj.precio = item[4]
            obj.preciop = item[5]
            data.push(obj)
        }
    })
    response.send({data})
})

router.get(pathObtenerProducto,(request, response)=>{
    var archivo = fs.readFileSync("./bd.csv","utf-8")
    var target = request.params.cod
    var data = []
    archivo.split("\n").map(linea=> linea.split(",")).forEach(item=>{
        if(item[0] === target){
            obj = {}
            obj.cod = item[0]
            obj.producto = item[1]
            obj.marca = item[2]
            obj.descripcion = item[3]
            obj.precio = item[4]
            obj.preciop = item[5]
            data.push(obj)
        }
    })
    response.send({data})
})

module.exports = router