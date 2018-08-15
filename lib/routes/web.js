/**
 * Express Web routes for frontend. 
 */

module.exports = function(app) {

    app.get('/', ( req, res ) => {
        res.send('Welcome to CentralRouter!');
    });

}