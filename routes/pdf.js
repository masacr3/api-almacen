const { response } = require("express")
const express = require("express")
const router = express.Router()
const pathpdf = "/api-pdf"

const pdfmake = require("pdfmake")
const fs = require("fs")


//actualizar
router.post(pathpdf,(req, res)=>{
    
    // const fonts = {
    //     Roboto: {
    //         normal: './fonts/Roboto-Regular.ttf',
    //         bold: './fonts/Roboto-Medium.ttf',
    //         italics: './fonts/Roboto-Italic.ttf',
    //         bolditalics: './fonts/Roboto-Italic.ttf'
    //     },
    // }
    
    // let pdf = new pdfmake(fonts)

    // var conseptos = [
    //     [{text: 'cant.Consepto', style: 'tableHeader'}, {text: 'subtotal', style: 'tableHeader'}]
    // ]
    
    // let docDefination = {
    //     pageSize: { width: 230, height: 'auto'},
    //     pageMargins: [ 10, 10, 10, 10 ],
    //     content : [
    //         {text: "ALMACEN DAJES", fontSize : 14, alignment : "center"},
    //         {text: "Punta lara 565", fontSize: 10, alignment : "center"},
    //         {text: "                ", alignment:"center"}, 
    //         {
    //             style: 'tableExample',
    //             table: {
    //                 headerRows: 1,
    //                 fontSize: 10,
    //                 body: [
    //                     [{text: 'cant.Consepto', style: 'tableHeader'}, {text: 'subtotal', style: 'tableHeader'}],
    //                     ['1.gaseosa coca cola 2.25', '350'],
    //                     ['2.fideo luchetti mostacholi 500g', '320'],
    //                 ]
    //             },
    //             layout: 'headerLineOnly'
    //         },
    //         "       ",
    //         {text : "TOTAL 670", alignment: "center"},
    //         "   ",
    //         {text : "GRACIAS POR SU COMPRA", alignment: "center"}
    //     ]
    // }
    
    // let pdfDoc = pdf.createPdfKitDocument(docDefination, {})
    // pdfDoc.pipe( fs.createWriteStream("pdfs/test.pdf"))
    // pdfDoc.end()


    // res.sendFile("C:/Users/leo_3/Desktop/api-almacen/pdfs/test.pdf")
    console.log("llego POST DESDE A HREF")

})

module.exports = router