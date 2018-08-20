const expressService = require('./lib/app.js');
const databaseService = require('./lib/database.js');
const socketService = require('./lib/wss.js');
const dotenv = require('dotenv').config();

/** Class representing the CentralRouter instance. */
class App {
    /**
     * Create a instance.
     * @param {String} appWebName 
     * @param {Number} appWebPort 
     * @param {String} appWssName 
     * @param {Number} appWssPort 
     * @param {String} appDBHost
     * @param {Number} appDBPort
     * @param {String} appDBName
     * @param {String} appDBUser
     * @param {String} appDBPass
     * @param {String} appLocale 
     */
    constructor(appWebName, appWebPort, appDomain, appWssName, appWssPort, appDBHost, appDBPort, appDBName, appDBUser, appDBPass, appLocale) {
        this.webName    = appWebName || "CentralRouter:WEB";
        this.webPort    = appWebPort || 8080;
        this.webDomain  = appDomain  || "localhost";
        this.wssName    = appWssName || "CentralRouter:WSS";
        this.wssPort    = appWssPort || 8081;
        this.dbHost     = appDBHost  || "localhost";
        this.dbPort     = appDBPort  || 27017;
        this.dbName     = appDBName  || "centralrouter";
        this.dbUser     = appDBUser  || "";
        this.dbPass     = appDBPass  || "";
        this.locale     = require(`./lib/translations/${appLocale}.json`) || require(`./lib/translations/en.json`);
    }

    /**
     * App init method, depends on app-module.
     */
    init() {
        module.exports = appInstance;

        expressService.init();
        databaseService.init();
        socketService.init();
    }
}

const appInstance = new App(
    process.env.APP_NAME,
    process.env.APP_PORT,
    process.env.APP_DOMAIN,
    process.env.WSS_NAME,
    process.env.WSS_PORT,
    process.env.DATABASE_HOST,
    process.env.DATABASE_PORT,
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASS,
    process.env.APP_LOCALE
);
appInstance.init();
