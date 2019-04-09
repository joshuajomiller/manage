const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  name: String,
  manager: {type: Schema.Types.ObjectId, ref: 'User'},
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  invites: [String],
  organisation: {type: Schema.Types.ObjectId, ref: 'Organisation'}
}, {timestamps: true});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;