/**
 * Express routes for CentralRouter HTTP Interface. 
 */
const serverManager = require('../middleware/serverManager'); 
const httpInterface = require('../interfaces/httpProtocol');

module.exports = function(app, io) {
    /**
     * Handle HTTP GET for the HTTPinterface.
     * @param {String} subDomain
     */
    app.get('/s/:subdomain/', ( req, res ) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = "/";

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

    /**
     * Handle wildcard HTTP GET for the HTTPinterface.
     * @param {String} subdomain
     * @param {String} route
     */
    app.get('/s/:subdomain/:route', ( req, res) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = "/" + req.params.route;

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

    /**
     * Handle HTTP POST for the HTTPinterface.
     * @param {String} subdomain
     * @param {JSON} anyBodyData  
     */
    app.post('/s/:subdomain/', (req, res) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = "/";

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.postRequest( virtualDomainAddress, io, reqRoute, (callback) => {
                        res.send(`${callback}`);
                    });
                } else {
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

    /**
     * Handle wildcard HTTP POST for the HTTPinterface.
     * @param {String} subdomain
     * @param {String} route
     * @param {JSON} anyBodyData  
     */
    app.post('/s/:subdomain/:route', (req, res) => {
        let subDomain   = req.params.subdomain;
        let reqRoute    = req.params.route;
        let anyBodyData = req.body;

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.postRequest( virtualDomainAddress, io, reqRoute, anyBodyData, (callback) => {
                        res.send(`${callback}`);
                    });
                } else {
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });
}