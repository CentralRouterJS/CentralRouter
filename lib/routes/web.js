/**
 * Express Web routes for frontend. 
 */

module.exports = function(app) {

    app.get('/', ( req, res ) => {
        res.send('index.html');
    });

    app.get('/newservice.html', ( req, res ) => {
        res.send('newservice.html');
    });

}