const express = require("express")
const router = express.Router()
var fs = require("fs")
const path = "/producto"


//retorna producto en caso de no existir retorna cod:0000 === NULL
router.get(path+"/:cod", (request, response)=>{
    console.log('GET RESIVIDO')
    let target = request.params.cod
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    let articulosinprocesar = archivo.filter(linea => linea.split(",")[0] === target)
    let articulo = { cod : '0000' }
    if (articulosinprocesar.length !==0 ){
        let data = articulosinprocesar[0].replace("\r","").split(",")
        articulo.cod = data[0]
        articulo.producto = data[1]
        articulo.marca = data[2]
        articulo.descripcion = data[3]
        articulo.precio = data[4]
        articulo.preciopublico = data[5]
    }
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

router.put(path,(request, response)=>{
    console.log("PUT")
    let data = request.body
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    let eliminamosProducto = archivo.filter(linea => linea.split(",")[0] !== data.cod)
    let linea = `${data.cod},${data.producto},${data.marca},${data.descripcion},${data.precio},${data.preciop}`
    eliminamosProducto.pop()
    eliminamosProducto.shift()
    eliminamosProducto.push(linea)
    let nuevalistaProductos = eliminamosProducto.map(item => item+"\n")
    fs.writeFileSync("bd.csv","codigobarras,producto,marca,descripcion,precio,preciopublico\n")
    nuevalistaProductos.forEach(item => fs.appendFileSync("bd.csv", item, err=>{
        if(err) console.log(err)
    }))
    response.send({ ok : "ok"})
})

router.delete(path+"/:cod",(request, response)=>{
    console.log("DELETE")
    let cod = request.params.cod
    console.log(cod)
    let archivo = fs.readFileSync("bd.csv","utf-8").split("\n")
    let eliminamosProducto = archivo.filter(linea => linea.split(",")[0] !== cod)
    eliminamosProducto.pop()
    eliminamosProducto.shift()
    let nuevalistaProductos = eliminamosProducto.map(item => item.replace("\r","")+"\n")
    console.log(nuevalistaProductos)
    fs.writeFileSync("bd.csv","codigobarras,producto,marca,descripcion,precio,preciopublico\n")
    nuevalistaProductos.forEach(item => fs.appendFileSync("bd.csv", item, err=>{
        if(err) console.log(err)
    }))
    response.send({ ok : "ok"})
})

module.exports = router