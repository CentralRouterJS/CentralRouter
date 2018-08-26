/**
 * ACL (Access List) module for validations.
 */
const serverManager = require('../middleware/serverManager'); 
module.exports = {
    authorizeAddress: function(address) {
        serverManager.findOneByAddress(address, (callback) => {
            if(callback[0]) {
                return true;
            } else {
                return false;
            }
        });
    }
}