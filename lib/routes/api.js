/**
 * Express API routes, returned data must be in JSON format. 
 */
const dotenv = require('dotenv');
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
     * @param {String} serverName
     * @param {String} serviceType
     * @param {Number} ipAddress
     */
    app.post(`${apiPrefix}/addserver`, (req, res) => {
        
    });
};