/**
 * HTTPProtocol interface module.
 * Function call must include the socket object.
 * @param {Object} socket 
 */
module.exports = {
    pushRequest: function(io, request) {
        io.sockets.emit('interfaces.http.request', request);
    }
};