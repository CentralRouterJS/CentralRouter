const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

module.exports = {
    init_services: function() {

        require('./routes/web.js')(app);
        require('./routes/api.js')(app);
        const appInstance = require('../index.js');
        const appLocale = appInstance.locale.app;

        const appServer = app.listen(appInstance.webPort, (err) => {
            if(err) throw err;

            console.log(`${appInstance.webName} ${appLocale.express_start} ${appInstance.webPort}!`);
        });

        console.log(`${appInstance.wssName} ${appLocale.wss_start} ${appInstance.wssPort}!`);
    }
};
