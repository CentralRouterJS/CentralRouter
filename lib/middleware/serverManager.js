const server = require('../models/servers.js');

module.exports = {
    /**
     * Save server based on method call.
     * @param  {String} name
     * @param  {String} address
     * @param  {String} type
     * @return {JSON}
     */
    saveServer: function( name, address, type, callback ) {
        const newServer = new server();
        newServer.name = name;
        newServer.address = address;
        newServer.type = type;

        newServer.save( (err) => {
            if(err) throw err;

            return callback(newServer);
        });
    },

    /**
     * Find all servers on method call.
     * @return {JSON}
     */
    findAll: function(callback) {
        server.find({}, (err, results) => {
            if(err) throw err;

            return callback(results);
        });
    },

    /**
     * Find one server by name on method call.
     * @return {JSON}
     */
    findOneByName: function(name, callback) {
        const nameObject = {
            name: name
        };

        server.find(nameObject, (err, results) => {
            if(err) throw err;

            return callback(results);
        });
    },

    /**
     * Find one server by IP address on method call.
     * @return {JSON}
     */
    findOneByAddress: function(address, callback) {
        const addressObject = {
            address: address
        };

        server.find(addressObject, (err, results) => {
            if(err) throw err;

            return callback(results);
        });
    }
}