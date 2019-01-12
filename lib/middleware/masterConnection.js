module.exports = {
    /**
     * Connect to the master server.
     * @param {*} domain 
     * @param {*} interfaces 
     */
    connect: function( domain, port, interfaces, masterUrl ) {
        const modules = require('../../index.js');
        const appLocale = modules.appInstance.locale;

        let domainLink = "http://" + domain + ":" + port;
        let masterConnectUrl = "http://" + masterUrl;
        let data = {
            domainLink,
            interfaces
        };

        let master = require('socket.io-client')(masterConnectUrl);
        master.on('connect', () => {
            console.log(`${appLocale.master.connect}`);
        });
        master.emit('publishdetails', (data));
        master.on('disconnect', () => {
            console.log(`${appLocale.master.disconnect}`);
        });
    }
}