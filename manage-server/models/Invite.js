const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new mongoose.Schema({
    email: String,
    status: String,
    manager: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Invite = mongoose.model('Team', inviteSchema);

module.exports = Invite;