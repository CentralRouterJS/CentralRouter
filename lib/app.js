const dotenv = require('dotenv').config();
const subdomain = require('express-subdomain');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

module.exports = {
    init: function() {
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({ extended: true }));
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
