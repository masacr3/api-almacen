const { response } = require("express")
const express = require("express")
const router = express.Router()
var fs = require("fs")
const path = "/producto"



router.get(path+"/:cod", (request, response)=>{
    console.log('GET RESIVIDO')
    let target = request.params.cod
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    
    let articulo = { cod : "0000"}
    archivo.forEach(linea =>{
        if( target === linea.split(",")[0]){
            let data = linea.split(",")
            //codigobarras,producto,marca,descripcion,precio,preciopublico
            articulo.cod = data[0]
            articulo.producto = data[1]
            articulo.marca = data[2]
            articulo.descripcion = data[3]
            articulo.precio = data[4]
            articulo.preciopublico = data[5]
        }
    })

    response.send( { articulo })
})

//agrega producto a la base de datos
router.post(path,(request, response)=>{
    console.log("POST RESIVIDO")
    const data = request.body
    console.log(data)
    if (data === undefined){
        console.log("no ingreso ningun producto")
        response.send({rta:"no ingreso ningun producto"})
    }
    else{
        var linea = `${data.cod},${data.producto},${data.marca},${data.descripcion},${data.precio},${data.preciop}\n`
        fs.appendFile("bd.csv", linea, err=>{
            if(err) console.log(err)
        })
    }
    response.send( { ok : "ok"})
})

module.exports = router