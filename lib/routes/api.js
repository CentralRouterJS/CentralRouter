/**
 * Express API routes, returned data must be in JSON format. 
 */
const dotenv = require('dotenv')
const validateServer = require('../middleware/validateServers');
const serverManager = require('../middleware/serverManager');
const apiPrefix = process.env.APP_API_PREFIX ? process.env.APP_API_PREFIX : "/api/v1";
const mcProtocol = require('../interfaces/minecraftProtocol');

module.exports = function (app) {
    const modules = require('../../index');
    const appInstance = modules.appInstance;
    const appLocale = appInstance.locale;

    /** 
     * Fetch all servers related to user.
     *  @return {JSON}
     */
    app.get(`${apiPrefix}/fetchservers`, (req, res) => {
        serverManager.findAll((callback) => {
            res.send(callback);
        });
    });

    /** 
     * Fetch one server related to user based on request.
     * @return {JSON}
     */
    app.get(`${apiPrefix}/fetchserver/:name`, (req, res) => {
        const reqFindServer = req.params.name;
        serverManager.findOneByName(reqFindServer, (callback) => {
            res.send(callback);
        });
    });

    /**
     * Save the data in the database based on request.
     * Start the server initialization if a protocol requires it.
     * @param {String} name
     * @param {Number} address
     * @param {String} type
     */
    app.post(`${apiPrefix}/addserver`, (req, res) => {
        const serverName = req.body.name;
        const serverAddress = req.body.address;
        const serverType = req.body.type;

        let dataObj = validateServer.createServer(serverName, serverAddress);

        if (dataObj.isValidAddress) {
            serverManager.saveServer(dataObj.serverName, dataObj.serverAddress, serverType,
                (callback) => {
                    switch (serverType) {
                        case 'minecraft':
                            mcProtocol.createServer(dataObj.serverName);
                            break;
                        default:
                            break;
                    }

                    res.send(callback);
                }
            );
        } else {
            res.send({ error: appLocale.api.wrong_ip_address });
        }
    });

    /**
     * Sends the IP address of the user from req.
     * @return {JSON}
     */
    app.get(`${apiPrefix}/getip`, (req, res) => {
        let address = req.ip;

        if ( address.substring(0, 7) === "::ffff:" ) {
            address = address.substring(7);
        }

        res.send({ ipaddress: address });
    });
};  