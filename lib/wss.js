/**
 * WebSocketServer initialization module.
 */
const server = require('http').createServer();
const io = require('socket.io')(server);
const ss = require('socket.io-stream');
const path = require('path');
const fs = require('fs');
const expressService = require('./app.js');
const httpInterface = require('./interfaces/httpProtocol');

module.exports = {
    init: function(app) {
        const modules = require('../index.js');
        const appLocale = modules.appInstance.locale;

        server.listen(modules.appInstance.wssPort, (err) => {
            if(err) throw err;

            console.log(`${modules.appInstance.wssName} ${appLocale.app.wss_start} ${modules.appInstance.wssPort}!`);
        });
        io.on('connection', (socket) => {
            let socketAddress = socket.request.connection.remoteAddress.replace('::ffff:', '');
            console.log(`${appLocale.wss.log_connect}${socketAddress}`);
            socket.join('wss.interfaces.servers');

            // Save the socketid to the Redis store by assigning to it's IP (Internet Protocol).
            // TODO: Validate the socket with ACL module, by looking up the pre-registered services from DB.
            modules.redisClient.set(socketAddress, socket.id);

            socket.emit('wss.interfaces.hello', {statusMessage: '200, Hello'});

            socket.on('interfaces.http.response.query', (data) => {
                console.log('QUERY RESPONSE');
                modules.localSocket.emit('localsocket.interfaces.response.query', data);
            });

            ss(socket).on('interfaces.http.response.static', (stream, data) => {
                const fileName = data.fileName;
                stream.pipe(fs.createWriteStream(path.join(__dirname, './routes/', fileName)));
                stream.on('finish', () => {
                    modules.localSocket.emit('localsocket.interfaces.response.static', fileName);
                });
            });

            socket.on('disconnect', () => {
                console.log(`${appLocale.wss.log_disconnect}`);
            });
        });
        expressService.init(io);
    }
}