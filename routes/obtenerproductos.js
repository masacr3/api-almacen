const express = require("express")
const router = express.Router()
const path = "/obtenerproducto"

var fs = require("fs")

router.get(path,(request, response)=>{
    var data = fs.readFileSync("./bdproductos.p", 'utf8');

    var dataa = [];
    data.split("\n").map(item=>item.replace("\r","")).forEach((item,i) =>{
        if (item !== ""){ 
            obj = {};
            obj["producto"]=item
            obj["id"] = i
            dataa.push(obj)
        }
    })
    response.send(dataa)
})

router.post(path,(request, response)=>{
    const data = request.body
    if (data === undefined){
        console.log("no ingreso ningun producto")
        response.send({rta:"no ingreso ningun producto"})
    }
    else{
        var linea = `${data.articulo}\n`
        fs.appendFile("bdproductos.p", linea, err=>{
            if(err) console.log(err)
        })
        response.send(data)
    }
})

module.exports = router