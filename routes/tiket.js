const express = require("express")
const router = express.Router()
var fs = require("fs")
const path = "/tiket"
var data = []
var total = 0

router.get(path, (req, res)=>{
    res.send( {ok:data, totalv : total})
})

//actualizar
router.post(path,(req, res)=>{
    
    var ip = req.body.ip
    var productos = req.body.productos
    console.log(productos)
    //arma producto
    var cuerpo = []
    total = 0
    data = []

    productos.forEach(producto => {
        var linea = []
        var consepto = producto.cantidad +"."+producto.producto+" "+producto.marca+" "+ producto.descripcion
        linea.push(consepto)
        linea.push(producto.subtotal)
        data.push(linea)
        total += parseInt(producto.subtotal)
    });

    console.log(data)

    res.send({ status : "el pdf se creo correctamente"})

})


module.exports = router