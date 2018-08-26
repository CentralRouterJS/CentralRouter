/**
 * Database initialization modules.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = {
    init: function() {
        const modules = require('../index.js');
        const appLocale = modules.appInstance.locale.app;

        if( modules.appInstance.dbUser == '' && modules.appInstance.dbPass == '') {
            mongoose.connect(`mongodb://${modules.appInstance.dbHost}:${modules.appInstance.dbPort}/${modules.appInstance.dbName}`, 
            {useNewUrlParser: true}, (err) => {
                if(err) throw err;

                console.log(`${appLocale.database_conn} mongodb://${modules.appInstance.dbHost}:${modules.appInstance.dbPort}/${modules.appInstance.dbName}!`);
            });
        } else {
            mongoose.connect(`mongodb://${modules.appInstance.dbUser}:${modules.appInstance.dbPass}@
                ${modules.appInstance.dbHost}:${modules.appInstance.dbPort}/${modules.appInstance.dbName}`, {useNewUrlParser: true}, (err) => {
                if(err) throw err;

                console.log(`${appLocale.database_conn} mongodb://${modules.appInstance.dbHost}:${modules.appInstance.dbPort}/${modules.appInstance.dbName}!`);
            });
        }  
    }
}
