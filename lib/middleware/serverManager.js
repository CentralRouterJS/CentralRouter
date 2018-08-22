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
     * Find one server on method call.
     * @return {JSON}
     */
    findOne: function(name, callback) {
        const nameObject = {
            name: name
        };

        server.find(nameObject, (err, results) => {
            if(err) throw err;

            return callback(results);
        });
    }
}