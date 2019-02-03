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
                        if(callback == undefined) {
                            console.log(`[HTTPINTERFACE] GET ${reqRoute} to ${subDomain}. 500 Internal Server Error.`);
                            res.status(500).send("500 Internal Server Error.");
                        }
                        console.log(`[HTTPINTERFACE] GET ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] GET ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
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
                        console.log(`[HTTPINTERFACE] GET ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] GET ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
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
                        console.log(`[HTTPINTERFACE] POST ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] POST ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
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
                        console.log(`[HTTPINTERFACE] POST ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] POST ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

    /**
     * Handle HTTP PUT for the HTTPinterface.
     * @param {String} subdomain
     * @param {JSON} anyBodyData  
     */
    app.put('/s/:subdomain/', (req, res) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = "/";

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.putRequest( virtualDomainAddress, io, reqRoute, (callback) => {
                        console.log(`[HTTPINTERFACE] PUT ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] PUT ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

    /**
     * Handle wildcard HTTP PUT for the HTTPinterface.
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

                    httpInterface.putRequest( virtualDomainAddress, io, reqRoute, anyBodyData, (callback) => {
                        console.log(`[HTTPINTERFACE] PUT ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] PUT ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });


    /**
     * Handle HTTP DELETE for the HTTPinterface.
     * @param {String} subdomain
     * @param {JSON} anyBodyData  
     */
    app.put('/s/:subdomain/', (req, res) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = "/";

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.deleteRequest( virtualDomainAddress, io, reqRoute, (callback) => {
                        console.log(`[HTTPINTERFACE] DELETE ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] DELETE ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });

    /**
     * Handle wildcard HTTP DELETE for the HTTPinterface.
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

                    httpInterface.deleteRequest( virtualDomainAddress, io, reqRoute, anyBodyData, (callback) => {
                        console.log(`[HTTPINTERFACE] DELETE ${reqRoute} to ${subDomain}. 200 Ok.`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`[HTTPINTERFACE] DELETE ${reqRoute} to ${subDomain}. 502 Bad Gateway.`);
                    res.status(502).send('502 Bad Gateway');
                }
            });
        }
    });
}