var {path, io} = require("../app")
var express = require("express")

const router = express.Router()

router.get("/listaarticulos",(req,res) =>{
    res.sendFile(path + "/listaarticulos/listaarticulos.html")
})

router.get("/pedido", (req, res)=>{
    res.sendFile(path + "/recepcionremitos/recepcionremitos.html")
})


router.post("/tomarpedido", (req, res)=>{
    var consepto = req.body
    io.emit("pedido", consepto)
    res.send({ok : "ok"})
})


//test
router.get("/daddy", (req,res)=>{
    io.emit("flag","marto gato")
})


module.exports = router
