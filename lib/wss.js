module.exports = {
    init: function() {
        const appInstance = require('../index.js');
        const appLocale = appInstance.locale.app;

        console.log(`${appInstance.wssName} ${appLocale.wss_start} ${appInstance.wssPort}!`);
    }
}