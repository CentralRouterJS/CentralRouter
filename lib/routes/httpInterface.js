/**
 * Express routes for CentralRouter HTTP Interface. 
 */
const serverManager = require('../middleware/serverManager'); 
const httpInterface = require('../interfaces/httpProtocol');

module.exports = function(app, io) {
    app.get('/s/:subdomain/', ( req, res ) => {
        let subDomain = req.params.subdomain;

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.getRequest( virtualDomainAddress, io, "/", (callback) => {
                        res.send(`${callback}`);
                    });
                } else {
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

}