/**
 * Express routes for CentralRouter HTTP Interface. 
 */
const serverManager = require('../middleware/serverManager'); 
const httpInterface = require('../interfaces/httpProtocol');

module.exports = function(app, io) {
    app.get('/s/:subdomain/', ( req, res ) => {
        let subDomain = req.params.subdomain;

        if(subDomain) {
            serverManager.findOne(subDomain, (callback) => {
                if(callback[0]) {
                    httpInterface.pushRequest( io, "/" );
                    res.send(`Welcome to ${callback[0].name}!`);
                } else {
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

}