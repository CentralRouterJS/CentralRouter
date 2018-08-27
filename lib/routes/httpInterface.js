/**
 * Express routes for CentralRouter HTTP Interface. 
 */
const serverManager = require('../middleware/serverManager'); 
const httpInterface = require('../interfaces/httpProtocol');

module.exports = function(app, io) {
    /**
     * Handle index route (/) for the HTTPinterface.
     * @param {String} subdomain
     */
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

    /**
     * Handle wildcard route (/*) for the HTTPinterface.
     * @param {String} subdomain
     * @param {String} route
     */
    app.get('/s/:subdomain/:route', ( req, res) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = req.params.route;

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.getRequest( virtualDomainAddress, io, reqRoute, (callback) => {
                        res.send(`${callback}`);
                    });
                } else {
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

}