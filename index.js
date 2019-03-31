const databaseService = require('./lib/database.js');
const socketService = require('./lib/wss.js');
const master = require('./lib/middleware/masterConnection.js');
const redis = require('redis');
const dotenv = require('dotenv').config();

/** Class representing the CentralRouter instance. */
class App {
    /**
     * Create a CentralRouter instance.
     * @param {String} appWebName 
     * @param {Number} appWebPort 
     * @param {String} appDomain
     * @param {String} appWssName 
     * @param {Number} appWssPort
     * @param {Boolean} appHttpsStatus
     * @param {Boolean} appAuthRequired 
     * @param {String} appDBHost
     * @param {Number} appDBPort
     * @param {String} appDBName
     * @param {String} appDBUser
     * @param {String} appDBPass
     * @param {String} appLocale 
     * @param {String} interfacesEnabled
     * @param {Boolean} publishOnMaster
     * @param {String} masterServer
     */
    constructor(appWebName, appWebPort, appDomain, appWssName, 
        appWssPort, appHttpsStatus, appAuthRequired, tcpHelperName, tcpHelperPort, appDBHost, appDBPort, appDBName, 
        appDBUser, appDBPass, redisHost, redisPort, 
        appLocale, interfacesEnabled, publishOnMaster, masterServer) {
        this.webName    = appWebName || "CentralRouter:WEB";
        this.webPort    = appWebPort || 8080;
        this.webDomain  = appDomain  || "localhost";
        this.wssName    = appWssName || "CentralRouter:WSS";
        this.wssPort    = appWssPort || 8081;
        this.httpsState = appHttpsStatus  || "http";
        this.authReq    = appAuthRequired || true;
        this.tcpName    = tcpHelperName || "CentralRouter:TCP";
        this.tcpPort    = tcpHelperPort || 8082;
        this.dbHost     = appDBHost  || "localhost";
        this.dbPort     = appDBPort  || 27017;
        this.dbName     = appDBName  || "centralrouter";
        this.dbUser     = appDBUser  || "";
        this.dbPass     = appDBPass  || "";
        this.redisHost  = redisHost  || "localhost";
        this.redisPort  = redisPort  || 6379;
        this.locale     = require(`./lib/translations/${appLocale}.json`) || require(`./lib/translations/en.json`);
        this.interfaces = interfacesEnabled || "";
        this.public     = publishOnMaster || true;
        this.masterUrl  = masterServer || "centralrouter-master:14886";
    }

    /**
     * App init method, depends on app-module.
     */
    init() {
        const redisClient = redis.createClient({
            host: this.redisHost,
            port: this.redisPort
        });
        const EventEmitter = require('events');
        class LocalSocketEmitter extends EventEmitter {};
        const localSocket = new LocalSocketEmitter();

        module.exports = {
            appInstance: appInstance,
            redisClient: redisClient,
            localSocket: localSocket
        };
        databaseService.init();
        socketService.init();
        if(typeof redisClient != "undefined") {
            console.log(`${this.locale.app.redis_conn} ${this.redisHost}:${this.redisPort}!`);
        }

        if(this.interfaces != "") {
            console.log(`${this.locale.interfaces.available} ${this.interfaces}`);
        } else {
            console.log(this.locale.interfaces.missing);
        }

        if(this.public) {
            master.connect(
                this.webDomain, 
                this.webPort,
                this.interfaces,
                this.masterUrl
            );
        }
    }
}

const appInstance = new App(
    process.env.APP_NAME,
    process.env.APP_PORT,
    process.env.APP_DOMAIN,
    process.env.WSS_NAME,
    process.env.WSS_PORT,
    process.env.HTTPS_ENABLED,
    process.env.AUTH_REQUIRED,
    process.env.TCP_NAME,
    process.env.TCP_PORT,
    process.env.DATABASE_HOST,
    process.env.DATABASE_PORT,
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASS,
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
    process.env.APP_LOCALE,
    process.env.INTERFACES_ENABLED,
    process.env.PUBLISH_ON_MASTER,
    process.env.MASTER_SERVER
);
appInstance.init();
