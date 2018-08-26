/**
 * HTTPProtocol interface module.
 * Function call must include the socket object.
 * @param {Object} socket 
 */
module.exports = {
    getRequest: function( virtualDomainAddress, io, request, callback ) {
        const modules = require('../../index.js');
        modules.redisClient.get(virtualDomainAddress, (err, result) => {
            if(err) throw err;

            if(result != null) {
                console.log(result);
                io.to(result).emit('interfaces.http.request', request);

                modules.localSocket.on('localsocket.interfaces.response', (data) => {
                    callback(data);
                });
            } else {
                callback(undefined);
            }
        });
    }
};