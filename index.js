const app = require('./lib/app.js');
const dotenv = require('dotenv').config();

/** Class representing the CentralRouter instance. */
class App {
    /**
     * Create a instance.
     * @param {String} appWebName 
     * @param {Number} appWebPort 
     * @param {String} appWssName 
     * @param {Number} appWssPort 
     * @param {String} appLocale 
     */
    constructor(appWebName, appWebPort, appWssName, appWssPort, appLocale) {
        this.webName    = appWebName || "CentralRouter:WEB";
        this.webPort    = appWebPort || 8080;
        this.wssName    = appWssName || "CentralRouter:WSS";
        this.wssPort    = appWssPort || 8081;
        this.locale     = require(`./lib/translations/${appLocale}.json`) || require(`./lib/translations/en.json`);
    }

    /**
     * App init method, depends on app-module.
     */
    init() {
        module.exports = appInstance;

        app.init_services();  
    }
}

const appInstance = new App(
    process.env.APP_NAME,
    process.env.APP_PORT,
    process.env.WSS_NAME,
    process.env.WSS_PORT,
    process.env.APP_LOCALE
);
appInstance.init();
