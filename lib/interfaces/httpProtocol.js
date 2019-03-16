/**
 * HTTPProtocol interface module.
 * Function call must include the socket object.
 * @param {Object} socket 
 */
module.exports = {
    getRequest: function( virtualDomainAddress, io, route, callback ) {
        const modules = require('../../index.js');
        // Get the SocketID of the interface.
        modules.redisClient.get(virtualDomainAddress, (err, result) => {
            if(err) throw err;

            if(result != null) {
                io.to(result).emit('interfaces.http.get', route);

                modules.localSocket.on('localsocket.interfaces.response.query', (data) => {
                    if(data) {
                        if(data.bodyData) {
                            let callbackData = {
                                fileStream: false,
                                responseData: data.bodyData
                            };

                            callback(callbackData);
                        }
                    }
                });

                modules.localSocket.on('localsocket.interfaces.response.static', (data) => {
                    if(data) {
                        let callbackData = {
                            fileStream: true,
                            responseData: data
                        };

                        callback(callbackData);
                    }
                });
            } else {
                callback(undefined);
            }
        });
    },

    postRequest: function( virtualDomainAddress, io, route, request, callback ) {
        const modules = require('../../index.js');
        // Get the SocketID of the interface.
        modules.redisClient.get(virtualDomainAddress, (err, result) => {
            if(err) throw err;

            if(result != null) {
                io.to(result).emit('interfaces.http.post', { 
                    route: route, 
                    data: request 
                });

                module.localSocket.on('localsocket.interfaces.response', (data) => {
                    if(data) {
                        if(data.bodyData) {
                            callback(data.bodyData);
                        }
                    }
                });
            } else {
                callback(undefined);
            }
        });
    },

    putRequest: function( virtualDomainAddress, io, route, request, callback ) {
        const modules = require('../../index.js');
        // Get the SocketID of the interface.
        modules.redisClient.get(virtualDomainAddress, (err, result) => {
            if(err) throw err;

            if(result != null) {
                io.to(result).emit('interfaces.http.put', { 
                    route: route, 
                    data: request 
                });

                module.localSocket.on('localsocket.interfaces.response', (data) => {
                    if(data) {
                        if(data.bodyData) {
                            callback(data.bodyData);
                        }
                    }
                });
            } else {
                callback(undefined);
            }
        });
    },

    deleteRequest: function( virtualDomainAddress, io, route, request, callback ) {
        const modules = require('../../index.js');
        // Get the SocketID of the interface.
        modules.redisClient.get(virtualDomainAddress, (err, result) => {
            if(err) throw err;

            if(result != null) {
                io.to(result).emit('interfaces.http.delete', { 
                    route: route, 
                    data: request 
                });

                module.localSocket.on('localsocket.interfaces.response', (data) => {
                    if(data) {
                        if(data.bodyData) {
                            callback(data.bodyData);
                        }
                    }
                });
            } else {
                callback(undefined);
            }
        });
    }
};