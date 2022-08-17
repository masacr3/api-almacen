const { response } = require("express")
const express = require("express")
const router = express.Router()
var fs = require("fs")
const path = "/cargarproducto"
const path4= "/cargarproducto/:cod"
const path2 = "/cargarproducto/consulta"
const path3 = "/cargarproducto/consulta/:cod"

var archivo = fs.readFileSync("./bd.csv", 'utf8');
var dataa = []
archivo.split("\n").map(item => item.split(",")).forEach((item,i) =>{
    if (item[0] !== ""){
        //codigobarras,producto,marca,descripcion,precio,preciopublico
        obj = {};
        obj["cod"]=item[0]
        obj["producto"]=item[1]
        obj["marca"]=item[2]
        obj["descripcion"]=item[3]
        obj["precio"]=item[4]
        obj["preciop"]=item[5]
        dataa.push(obj)
    }
})

router.put(path4,(req, res)=>{
    var cod = req.params.cod
    var p = req.body
    dataa.forEach(item=>{
        if(item.cod === cod){
            item.producto = p.producto
            item.marca = p.marca
            item.descripcion = p.descripcion
            item.precio = p.precio
            item.preciop = p.preciop
        }
    })
    var stream = fs.createWriteStream("./bd.csv");
    stream.once('open', function(fd) {
        //stream.write("My first row\n");
        dataa.forEach(item=>{
            var linea = `${item.cod},${item.producto},${item.marca},${item.descripcion},${item.precio},${item.preciop}\n`
            stream.write(linea)
        })
        stream.end();
    })
    
})


//actualizar
router.get(path3,(req, res)=>{
    var cod = req.params.cod
    var pos = -1
    dataa.forEach((item,i)=>{
        if(item.cod === cod){
            pos = i;
        }
    })
    if (pos >=0){
        res.send({producto: dataa[pos]})
    }
    else{
        obj = {};
        obj["cod"]= "vacio"
        res.send({producto:obj})
    }
})

//existencia del id
router.post(path2,(req,res)=>{
    const data = req.body
    if (data === undefined){
        console.log("no ingreso nada")
        res.send({rta:"no ingreso nada"})
    }
    else{
        var cod = data.cod
        var esta = false
        dataa.forEach(item =>{
            if(item.cod === cod) esta = true
        })
        res.send({rta:esta})
    }
})

//agrega producto a la base de datos
router.post(path,(request, response)=>{
    const data = request.body
    if (data === undefined){
        console.log("no ingreso ningun producto")
        response.send({rta:"no ingreso ningun producto"})
    }
    else{
        var linea = `${data.id},${data.producto},${data.marca},${data.descripcion},${data.precio},${data.preciopublico}\n`
        fs.appendFile("bd.csv", linea, err=>{
            if(err) console.log(err)
        })
        obj = {};
        obj["cod"]=data.id
        dataa.push(obj)
        response.send(data)
    }
})

module.exports = router