const path = require("path")
const express = require("express")
const router = express.Router()
const pathpdf = "/api-pdf"

const { jsPDF } = require("jspdf")
const fs = require("fs")

function obtenerIP(){
    var os = require('os');
    var ifaces = os.networkInterfaces();

    var ip = ""

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
            }
 
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
               ip = iface.address
            } 
            else {
                // this interface has only one ipv4 adress
                
                ip = iface.address
            }
            ++alias;
        });
    })
    return ip
}

router.get(pathpdf, (req, res)=>{
    //res.sendFile("C:/Users/leo_3/OneDrive/Escritorio/api/pdfs/test.pdf")
    let pathpdf = __dirname.slice(0).replace("\\routes","") + "\\pdfs\\test.pdf"
    res.sendFile(pathpdf)
    //res.send({ok : "PDF GET"})
})


//actualizar
router.post(pathpdf,(req, res)=>{
    
    var ip = req.body.ip
    var productos = req.body.productos
    console.log(productos)
    //arma producto
    var total = 0
    var lineas = []
    var largeLine = 30
    // productos.forEach(producto => {
    //     console.log(producto)
    // });
    productos.forEach(producto => {
        var cantCaracteres = largeLine - 1 - 5 - producto.cantidad.length - producto.producto.length -1 
        console.log(cantCaracteres)
        var consepto = producto.cantidad +"."+producto.producto //+" "+producto.marca+" "+ producto.descripcion
        var overflood = true
        if (cantCaracteres >= (producto.marca.length+1)){
            consepto += " " + producto.marca
            cantCaracteres -= producto.marca.length
            overflood = false
        }
        //rellena
        console.log("rellena", cantCaracteres)
        for(let i=0; cantCaracteres > 0 ; i++){
            consepto += " "
            cantCaracteres -= 1
        }
        console.log("relleno", consepto.length)
        //inserto
        consepto += producto.subtotal
        lineas.push(consepto)
        if (overflood){
            var consepto2 = producto.marca +" "+producto.descripcion
            lineas.push(consepto2)
        }
        else{
            lineas.push(producto.descripcion)
        }
        total += parseInt(producto.subtotal)
    });

    let creaComprobante = () => {
        var opciones = {
            orientation: 'p',
            unit: 'mm',
            format: [76, 297]
        };
    
        var doc = new jsPDF(opciones);
        var middle = Math.trunc(largeLine / 2)

        console.log(doc.getFontList())
        doc.setFont("courier");
        doc.setFontSize(9);
        //doc.text("123456789012345678901234567890",10,5)
        doc.text("DAJES ALMACEN",10 + middle - Math.trunc("DAJES ALMACEN".length / 4,10),10)
        doc.text("Punta lara 565",10 + middle - Math.trunc("Punta lara 565".length /4,15),15)
        var x = 10 
        var y = 25

        lineas.forEach(linea =>{
            doc.text(linea, x, y)
            y += 5
        })
        // doc.text("1.queso rallado",10,25);
        // doc.text("sancor reggianito 40g",10,30)
        // doc.text(10, 35, 'Comprobante No.: 7854214587');
        // doc.text(10, 40, 'PDV: Pedro Pérez');
        // doc.text(10, 45, 'Operador: 123654');
        // doc.text(10, 55, 'Especie vendida: Sophronitis coccinea');
        // doc.text(10, 60, 'Valor: 35.00');
        // doc.text(10, 65, 'TBX: 242985290');
        // doc.text(10, 70, 'Fecha/Hora: 2019-11-05 12:28:21');
        // doc.text(10, 90, '_______________________________');
        // doc.text(10, 95, 'Recibí conforme');
    
        let data = doc.output();
        let pathpdf = __dirname.slice(0).replace("\\routes","") + "\\pdfs\\test.pdf"
        fs.writeFileSync(pathpdf, data, 'binary');

    }

    creaComprobante()

    res.send({ok:"ok"})
})

// router.get(pathpdf, (request, response) =>{
//     console.log(path.relative(__dirname, "pdfs/test.pdf"))
// })

module.exports = router