const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: String,
    url: String
}, { timestamps: true });

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;