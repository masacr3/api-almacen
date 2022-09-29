const { response } = require("express")
const express = require("express")
const router = express.Router()
var fs = require("fs")
const path = "/verduleria"

router.get(path, (request, response)=>{
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    let filtramosProducto = archivo.filter(linea => linea.split(",")[2] == "verduleria")
    console.log(filtramosProducto)
    let articulos = []
    filtramosProducto.forEach(item=>{
        item = item.replace("\r","")
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

router.post(path, (request, response)=>{
    let contador = fs.readFileSync("contador.csv", "utf-8").split("\n")
    let contVerduleria = parseInt( contador.filter(linea => linea.split(",")[0] === "verduleria")[0].split(",")[1])+1
    let actualizamoscontador = contador.filter(linea => linea.split(",")[0] !== "verduleria")
    let nuevoContador = "verduleria,"+contVerduleria+"\n"
    actualizamoscontador.shift()
    actualizamoscontador.pop()
    actualizamoscontador.push(nuevoContador)
    fs.writeFileSync("contador.csv","descriptor,contador\n")
    actualizamoscontador.forEach(item => fs.appendFileSync("contador.csv", item, err=>{
        if(err) console.log(err)
    }))
    
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    let filtramosProducto = archivo.filter(linea => linea.split(",")[2] == "verduleria")
    let cod = "ver-item-"+ contVerduleria
    const data = request.body
    console.log(data)
    if (data === undefined){
        console.log("no ingreso ningun producto")
        response.send({rta:"no ingreso ningun producto"})
    }
    else{
        var linea = `${cod},${data.producto},${data.marca},${data.descripcion},${data.precio},${data.preciop}\n`
        fs.appendFile("bd.csv", linea, err=>{
            if(err) console.log(err)
        })
    }
    response.send( { ok : "ok", codbarras : cod})
})

module.exports = router