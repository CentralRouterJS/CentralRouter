/**
 * Express APP initialization module.
 */
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const wildcardSubdomains = require('wildcard-subdomains');

module.exports = {
    init: function(io) {
        const modules = require('../index.js');
        const appLocale = modules.appInstance.locale;
        app.use(wildcardSubdomains({
            namespace: 's',
            whitelist: ['www'],
        }));          
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({ extended: true }));
        if( modules.appInstance.interfaces.includes('http') ) {
          require('./routes/httpInterface.js')( app, io );  
          console.log(appLocale.interfaces.init_http);
        }
        require('./routes/web.js')(app);
        require('./routes/api.js')(app);
        app.listen(modules.appInstance.webPort, (err) => {
            if(err) throw err;

            console.log(`${modules.appInstance.webName} ${appLocale.app.express_start} ${modules.appInstance.webPort}!`);
        });
    }
};
