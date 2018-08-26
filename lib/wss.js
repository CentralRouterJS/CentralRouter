/**
 * WebSocketServer initialization module.
 */
const server = require('http').createServer();
const io = require('socket.io')(server);
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

            socket.on('interfaces.http.response', (data) => {
                modules.localSocket.emit('localsocket.interfaces.response', data);
            });

            socket.on('disconnect', () => {
                console.log(`${appLocale.wss.log_disconnect}`);
            });
        });
        expressService.init(io);
    }
}