const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: String,
    url: String,
    code: String
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;