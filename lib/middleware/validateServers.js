/**
 * Validate the new services created by users.
 */
const net = require('net');

module.exports = {
    createServer: ( serverName, serverAddress ) => {
        let validatedData = {
            serverName,
            serverAddress,
            isValidAddress:'false'
        }

        validatedData.serverName      = serverName.toLowerCase().trim();
        validatedData.serverAddress   = serverAddress.toLowerCase().trim();

        validatedData.isValidAddress = ( net.isIP(validatedData.serverAddress) ) > 0 ? true : false;

        return validatedData;
    }
}