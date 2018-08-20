const dotenv = require('dotenv').config();
const subdomain = require('express-subdomain');
const express = require('express');
const app = express();

module.exports = {
    init: function() {
        require('./routes/web.js')(app);
        require('./routes/api.js')(app);
        require('./routes/httpInterface.js')(app);
        const appInstance = require('../index.js');
        const appLocale = appInstance.locale.app;

        app.listen(appInstance.webPort, (err) => {
            if(err) throw err;

            console.log(`${appInstance.webName} ${appLocale.express_start} ${appInstance.webPort}!`);
        });
    }
};
