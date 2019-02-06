const net = require('net');

module.exports = {
    createServer: ( serverName, serverAddress ) => {
        let validatedData = {
            serverName,
            serverAddress,
            isValidAddress
        }

        validatedData.serverName      = serverName.toLowerCase().trim();
        validatedData.serverAddress   = serverAddress.toLowerCase().trim();

        validatedData.isValidAddress = ( net.isIP(validatedData.serverAddress) ) > 0 ? true : false;

        return validatedData;
    }
}