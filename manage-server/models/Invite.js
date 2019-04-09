const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new mongoose.Schema({
    email: String,
    status: String,
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    organisation: { type: Schema.Types.ObjectId, ref: 'Organisation' }
}, { timestamps: true });

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;