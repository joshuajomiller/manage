const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    name: String,
    manager: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Team = mongoose.model('Organisation', teamSchema);

module.exports = Team;