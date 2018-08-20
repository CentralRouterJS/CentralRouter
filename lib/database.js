const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = {
    init: function() {
        const appInstance = require('../index.js');
        const appLocale = appInstance.locale.app;

        if( appInstance.dbUser == '' && appInstance.dbPass == '') {
            mongoose.connect(`mongodb://${appInstance.dbHost}:${appInstance.dbPort}/${appInstance.dbName}`, 
            {useNewUrlParser: true}, (err) => {
                if(err) throw err;

                console.log(`${appLocale} mongodb://${appInstance.dbHost}:${appInstance.dbPort}/${appInstance.dbName}`);
            });
        } else {
            mongoose.connect(`mongodb://${appInstance.dbUser}:${appInstance.dbPass}@
                ${appInstance.dbHost}:${appInstance.dbPort}/${appInstance.dbName}`, {useNewUrlParser: true}, (err) => {
                if(err) throw err;

                console.log(`${appLocale} mongodb://${appInstance.dbHost}:${appInstance.dbPort}/${appInstance.dbName}`);
            });
        }  
    }
}
