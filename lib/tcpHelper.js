const net = require('net');

/**
 * TCP-server initialization module.
 * @param {Object} socket
 */
module.exports = {
    init: (io) => {
        const modules = require('../index.js');
        const appLocale = modules.appInstance.locale;
        const tcpPort = modules.appInstance.tcpPort;

        const server = net.createServer((socket) => {
            socket.write('[TCP] HELLO\r\n');
            socket.pipe(socket);
        });

        server.listen(tcpPort, (err) => {
            if (err) throw err;

            console.log(`${appLocale.tcp.prefix} ${appLocale.tcp.start} ${tcpPort}.`);
        });
    }
}