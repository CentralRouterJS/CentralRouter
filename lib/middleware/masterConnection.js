module.exports = {
    /**
     * Connect to the master server.
     * @param {*} domain 
     * @param {*} interfaces 
     */
    connect: function( domain, interfaces) {
        let data = {
            domain,
            interfaces
        };

        let master = require('socket.io-client')('http://localhost:14886');
        master.on('connect', () => {
            console.log('Master connection established!');
        });
        master.emit('publishdetails', (data));
        master.on('disconnect', () => {
            console.log('Master connection closed.');
        });
    }
}