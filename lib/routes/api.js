/**
 * Express API routes, returned data must be in JSON format. 
 */
const dotenv = require('dotenv');
const serverManager = require('../middleware/serverManager');
const apiPrefix = process.env.APP_API_PREFIX ? process.env.APP_API_PREFIX : "/api/v1";

module.exports = function(app) {
    /** 
     * Fetch all servers related to user.
     *  @return {JSON}
     */
    app.get(`${apiPrefix}/fetchservers`, (req, res) => {
        serverManager.findAll(res);
    });

    /** 
     * Fetch one server related to user based on request.
     * @return {JSON}
     */
    app.get(`${apiPrefix}/fetchserver/:name`, (req, res) => {
        const reqFindServer = req.params.name;
        serverManager.findOne(reqFindServer, res);
    });

    /**
     * Save the data in the database based on request.
     * @param {String} name
     * @param {Number} address
     * @param {String} type
     */
    app.post(`${apiPrefix}/addserver`, (req, res) => {
        const serverName = req.body.name;
        const serverAddress = req.body.address;
        const serverType = req.body.type;

        serverManager.saveServer(
            serverName, 
            serverAddress, 
            serverType,
            res
        );
    });
};