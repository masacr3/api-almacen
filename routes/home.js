const { response } = require("express")
const express = require("express")
const router = express.Router()
const home = "/"
const homeip = "/ip"

router.get(home, (request, response)=>{
    response.send({ok:"ok"})
})

router.get(homeip, (request, response) =>{
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
                console.log(ifname + ':' + alias, iface.address);
            } 
            else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
                ip = iface.address
            }
            ++alias;
        });
    });

    response.send({ ip })
})

module.exports = router