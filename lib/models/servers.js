const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    unique_id   : { type: Number, default: new Date().getTime() },
    name        : { type: String, lowercase: true },
    address     : String,
    type        : String,
    created_at  : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Servers', serverSchema);
