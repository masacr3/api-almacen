const { response } = require("express")
const express = require("express")
const router = express.Router()
const home = "/"

router.get(home, (request, response)=>{
    response.send({ok:"ok"})
})

module.exports = router