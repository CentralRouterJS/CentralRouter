/**
 * Express routes for CentralRouter HTTP Interface. 
 */
const serverManager = require('../middleware/serverManager'); 
const httpInterface = require('../interfaces/httpProtocol');
const path = require('path');

module.exports = function(app, io) {
    const modules = require('../../index');
    const appInstance = modules.appInstance;
    const appLocale = appInstance.locale;

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
                        if (callback == undefined) {
                            console.log(`${appLocale.interfaces.http_interface.get_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 500 ${appLocale.interfaces.http_interface.method_is}`);
                            res.status(500).send(`500 ${appLocale.interfaces.http_interface.method_is}`);
                        } else if (callback.fileStream === false) {
                            console.log(`${appLocale.interfaces.http_interface.get_method} QUERY ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                            res.status(200).send(`${callback.responseData}`);
                        } else if (callback.fileStream === true) {
                            console.log(`${appLocale.interfaces.http_interface.get_method} STATIC ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                            res.status(200).sendFile(path.join(__dirname, '../../private/', callback.responseData));
                        }
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.get_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
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
                        if (callback == undefined) {
                            console.log(`${appLocale.interfaces.http_interface.get_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 500 ${appLocale.interfaces.http_interface.method_is}`);
                            res.status(500).send(`500 ${appLocale.interfaces.http_interface.method_is}`);
                        } else if (callback.fileStream === false) {
                            console.log(`${appLocale.interfaces.http_interface.get_method} QUERY ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                            res.status(200).send(`${callback.responseData}`);
                        } else if (callback.fileStream === true) {
                            console.log(`${appLocale.interfaces.http_interface.get_method} STATIC ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                            console.log(callback.responseData);
                            res.status(200).sendFile(__dirname + callback.responseData);
                        }
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.get_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
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
                        console.log(`${appLocale.interfaces.http_interface.post_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.post_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
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
                        console.log(`${appLocale.interfaces.http_interface.get_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.post_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
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
                        console.log(`${appLocale.interfaces.http_interface.put_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.put_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
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
    app.put('/s/:subdomain/:route', (req, res) => {
        let subDomain   = req.params.subdomain;
        let reqRoute    = req.params.route;
        let anyBodyData = req.body;

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.putRequest( virtualDomainAddress, io, reqRoute, anyBodyData, (callback) => {
                        console.log(`${appLocale.interfaces.http_interface.put_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.put_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
                }
            });
        }
    });


    /**
     * Handle HTTP DELETE for the HTTPinterface.
     * @param {String} subdomain
     * @param {JSON} anyBodyData  
     */
    app.delete('/s/:subdomain/', (req, res) => {
        let subDomain = req.params.subdomain;
        let reqRoute  = "/";

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.deleteRequest( virtualDomainAddress, io, reqRoute, (callback) => {
                        console.log(`${appLocale.interfaces.http_interface.delete_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.delete_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
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
    app.delete('/s/:subdomain/:route', (req, res) => {
        let subDomain   = req.params.subdomain;
        let reqRoute    = req.params.route;
        let anyBodyData = req.body;

        if(subDomain) {
            serverManager.findOneByName(subDomain, (callback) => {
                if(callback[0]) {
                    const virtualDomainAddress = callback[0].address;

                    httpInterface.deleteRequest( virtualDomainAddress, io, reqRoute, anyBodyData, (callback) => {
                        console.log(`${appLocale.interfaces.http_interface.delete_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 200 ${appLocale.interfaces.http_interface.method_ok}`);
                        res.status(200).send(`${callback}`);
                    });
                } else {
                    console.log(`${appLocale.interfaces.http_interface.delete_method} ${reqRoute} ${appLocale.interfaces.http_interface.method_arrow} ${subDomain}. 502 ${appLocale.interfaces.http_interface.method_bg}`);
                    res.status(502).send(`502 ${appLocale.interfaces.http_interface.method_bg}`);
                }
            });
        }
    });
}