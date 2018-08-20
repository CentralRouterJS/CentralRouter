const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    name        : String,
    address     : String,
    type        : String,
    created_at  : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Servers', serverSchema);
