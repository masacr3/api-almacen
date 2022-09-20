const path = require("path")
const express = require("express")
const router = express.Router()
const pathpdf = "/api-pdf"

const pdfmake = require("pdfmake")
const fs = require("fs")

router.get(pathpdf, (req, res)=>{
    //res.sendFile("C:/Users/leo_3/OneDrive/Escritorio/api/pdfs/test.pdf")
    let pathpdf = __dirname.slice(0).replace("\\routes","") + "\\pdfs\\test.pdf"
    res.sendFile(pathpdf)
    //res.send({ok : "PDF GET"})
})


//actualizar
router.post(pathpdf,(req, res)=>{
    
    var productos = req.body.productos
    console.log(productos)
    //arma producto
    var total = 0
    var cuerpo = [
        [{text: 'cant.Consepto', style: 'tableHeader'}, {text: 'subtotal', style: 'tableHeader'}]
    ]
    // productos.forEach(producto => {
    //     console.log(producto)
    // });
    productos.forEach(producto => {
        var linea = []
        var consepto = producto.cantidad +"."+producto.producto+" "+producto.marca+" "+ producto.descripcion
        linea.push(consepto)
        linea.push(producto.subtotal)
        cuerpo.push(linea)
        total += parseInt(producto.subtotal)
    });

    console.log(cuerpo)

    const fonts = {
        Roboto: {
            normal: './fonts/Roboto-Regular.ttf',
            bold: './fonts/Roboto-Medium.ttf',
            italics: './fonts/Roboto-Italic.ttf',
            bolditalics: './fonts/Roboto-Italic.ttf'
        },
    }
    
    let pdf = new pdfmake(fonts)

    var conseptos = [
        [{text: 'cant.Consepto', style: 'tableHeader'}, {text: 'subtotal', style: 'tableHeader'}]
    ]
    
    let docDefination = {
        pageSize: { width: 200, height: 'auto'},
        pageMargins: [ 20, 0, 0, 0 ],
        content : [
            {text: "ALMACEN DAJES", fontSize : 14, alignment : "center"},
            {text: "Punta lara 565", fontSize: 10, alignment : "center"},
            {text: "                ", alignment:"center"}, 
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    fontSize: 10,
                    body: cuerpo
                },
                layout: 'headerLineOnly'
            },
            "       ",
            {text : "TOTAL "+total, alignment: "center"},
            "   ",
            {text : "GRACIAS POR SU COMPRA", alignment: "center"}
        ]
    }
    
    let pdfDoc = pdf.createPdfKitDocument(docDefination, {})
    pdfDoc.pipe( fs.createWriteStream("pdfs/test.pdf"))
    pdfDoc.end()

    var relativo = path.relative(__dirname, "pdfs/test.pdf")
    //res.sendFile(relativo)
    console.log(relativo)

    res.send({ status : "el pdf se creo correctamente" , link : "http://192.168.0.23:3000/api-pdf"})

})

// router.get(pathpdf, (request, response) =>{
//     console.log(path.relative(__dirname, "pdfs/test.pdf"))
// })

module.exports = router