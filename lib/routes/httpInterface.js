/**
 * Express routes for CentralRouter HTTP Interface. 
 */
const subdomain = require('express-subdomain');

module.exports = function(app) {
    // app.use(subdomain('localhost'));

    app.get('/subdomain/:name', ( req, res ) => {
        const subreq = req.params.name;

        res.send(`Welcome to CentralRouter at ${subreq}!`);
    });

}