/**
 * Express API routes, returned data must be in JSON format. 
 */
const dotenv = require('dotenv');
const server = require('../models/servers.js');
const apiPrefix = process.env.APP_API_PREFIX ? process.env.APP_API_PREFIX : "/api/v1";

module.exports = function(app) {
    /** 
     * Fetch all servers related to user.
     *  @return {JSON}
     */
    app.get(`${apiPrefix}/fetchservers`, (req, res) => {
        res.send([
            {"name" : "HTTPServerHosting#1"},
            {"name" : "HTTPServerHosting#2"}
        ]);
    });

    /** 
     * Fetch one server related to user based on request.
     * @return {JSON}
     */
    app.get(`${apiPrefix}/fetchserver/:name`, (req, res) => {
        res.send([
            {"name" : "HTTPServerHosting#1"}
        ]);
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

        const newServer = new server();
        newServer.name = serverName;
        newServer.address = serverAddress;
        newServer.type = serverType;

        newServer.save((err) => {
            if(err) throw err;

            res.send({"success": {
                "name": serverName,
                "address": serverAddress,
                "type": serverType
            }});
        });
    });
};