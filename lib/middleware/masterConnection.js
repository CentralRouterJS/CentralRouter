module.exports = {
    /**
     * Connect to the master server.
     * @param {*} domain 
     * @param {*} interfaces 
     */
    connect: function( domain, port, interfaces, masterUrl ) {
        console.log('1234');
        const modules = require('../../index.js');
        const appInstance = modules.appInstance;
        const appLocale = appInstance.locale;

        let domainLink = (appInstance.httpsState === true) ? 'https://' + domain + ':' + port : 'http://' + domain + ':' + port;
        let masterConnectUrl = (appInstance.httpsState === true) ? 'https://' + masterUrl : 'http://' + masterUrl;
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