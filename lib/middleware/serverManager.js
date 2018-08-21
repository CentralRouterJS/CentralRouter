const server = require('../models/servers.js');

module.exports = {
    /**
     * Save server based on method call.
     * @param  {String} name
     * @param  {String} address
     * @param  {String} type
     * @return {JSON}
     */
    saveServer: function( name, address, type, res ) {
        let getSaveResult = function(res) {
            return function(err, result) {
                if(err) throw err;

                res.send(result);
            }
        };

        const newServer = new server();
        newServer.name = name;
        newServer.address = address;
        newServer.type = type;

        newServer.save(getSaveResult(res));
    },

    /**
     * Find all servers on method call.
     * @return {JSON}
     */
    findAll: function(res) {
        let getAllServers = function(res) {
            return function(err, result) {
                if(err) throw err;

                res.send(result);
            }
        };

        server.find({}, getAllServers(res));
    },

    /**
     * Find one server on method call.
     * @return {JSON}
     */
    findOne: function(name, res) {
        const nameObject = {
            name: name
        };

        let getOneServer = function(res) {
            return function(err, result) {
                if(err) throw err;

                res.send(result);
            }
        }
        server.find(nameObject, getOneServer(res));
    }
}