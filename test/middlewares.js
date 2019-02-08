const validate = require('../lib/middleware/validateServers');

describe('middlewares', () => {
    describe('Validate correct IPv4', () => {
        it('Should return with correct validation (IPv4):', (done) => {
            let validatedDataObject = validate.createServer('CentralRouterConnector', '127.0.0.1');

            if (validatedDataObject.isValidAddress)
                done();
        });
    });
    
    describe('Validate correct IPv6', () => {
        it('Should return with correct validation (IPv6):', (done) => {
            let validatedDataObject = validate.createServer('CentralRouterConnector', '0:0:0:0:0:0:0:1');

            if (validatedDataObject.isValidAddress)
                done();
        });
    });

    describe('Validate wrong IPv4', () => {
        it('Should return with invaild address (IPv4):', (done) => {
            let validatedDataObject = validate.createServer('CentralRouterConnector', '512.255.255.0');

            if (!(validatedDataObject.isValidAddress))
                done();
        });
    });

    describe('Validate wrong IPv6', () => {
        it('Should return with invaild address (IPv4)', (done) => {
            let validatedDataObject = validate.createServer('CentralRouterConnector', 'Z:invaild:Z');

            if (!(validatedDataObject.isValidAddress))
                done();
        });
    });

});
