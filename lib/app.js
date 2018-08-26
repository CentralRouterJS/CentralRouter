/**
 * Express APP initialization module.
 */
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const wildcardSubdomains = require('wildcard-subdomains');

module.exports = {
    init: function(io) {
        app.use(wildcardSubdomains({
            namespace: 's',
            whitelist: ['www'],
        }));          
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({ extended: true }));
        require('./routes/httpInterface.js')( app, io );
        require('./routes/web.js')(app);
        require('./routes/api.js')(app);
        const modules = require('../index.js');
        const appLocale = modules.appInstance.locale.app;

        app.listen(modules.appInstance.webPort, (err) => {
            if(err) throw err;

            console.log(`${modules.appInstance.webName} ${appLocale.express_start} ${modules.appInstance.webPort}!`);
        });
    }
};
