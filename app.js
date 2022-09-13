const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()


const pdfmake = require("pdfmake")
const fs = require("fs")

const fonts = {
    Roboto: {
        normal: './fonts/Roboto-Regular.ttf',
        bold: './fonts/Roboto-Medium.ttf',
        italics: './fonts/Roboto-Italic.ttf',
        bolditalics: './fonts/Roboto-Italic.ttf'
    },
}

let pdf = new pdfmake(fonts)

let docDefination = {
    pageSize: { width: 230, height: 'auto'},
    pageMargins: [ 10, 10, 10, 10 ],
    content : [
        {text: "ALMACEN DAJES", fontSize : 14, alignment : "center"},
        {text: "Punta lara 565", fontSize: 10, alignment : "center"},
        {text: "                ", alignment:"center"}, 
        {
			style: 'tableExample',
			table: {
				headerRows: 1,
                fontSize: 10,
				body: [
					[{text: 'cant.Consepto', style: 'tableHeader'}, {text: 'subtotal', style: 'tableHeader'}],
					['1.gaseosa coca cola 2.25', '350'],
					['2.fideo luchetti mostacholi 500g', '320'],
				]
			},
			layout: 'headerLineOnly'
		},
        "       ",
        {text : "TOTAL 670", alignment: "center"},
        "   ",
        {text : "GRACIAS POR SU COMPRA", alignment: "center"}
    ]
}

let pdfDoc = pdf.createPdfKitDocument(docDefination, {})
pdfDoc.pipe( fs.createWriteStream("pdfs/test.pdf"))
pdfDoc.end()

app.use(
    bodyParser.json({
        limit:"20mb"
    })
)

app.use(
    bodyParser.urlencoded({
        limit:"20mb",
        extended:true
    })
)

app.use(cors())

const productos = require("./routes/productos")
const obtenerpdf = require("./routes/pdf")

app.use(productos)
app.use(obtenerpdf)

const port = 3000

app.listen(port,"0.0.0.0",()=>{
    console.log("Servidor activo")
})