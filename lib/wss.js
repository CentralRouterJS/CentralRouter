/**
 * WebSocketServer initialization module.
 */
const server = require('http').createServer();
const io = require('socket.io')(server);
const expressService = require('./app.js');

module.exports = {
    init: function(app) {
        const appInstance = require('../index.js');
        const appLocale = appInstance.locale;

        server.listen(appInstance.wssPort, (err) => {
            if(err) throw err;

            console.log(`${appInstance.wssName} ${appLocale.app.wss_start} ${appInstance.wssPort}!`);
        });
        io.on('connection', (socket) => {
            socket.emit('wss.interfaces.hello', {statusMessage: '200, Hello'});
            socket.join('wss.interfaces.servers');
            socket.on('disconnect', () => {
                console.log(`${appLocale.wss.log_disconnect}`);
            });
        });
        expressService.init(io);
    }
}