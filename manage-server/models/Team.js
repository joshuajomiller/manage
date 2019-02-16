const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  name: String,
  manager: {type: Schema.Types.ObjectId, ref: 'User'},
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  invites: [String],
  preferences: {
    feedback: {
      weekly: Boolean,
      monthly: Boolean
    }
  }
}, {timestamps: true});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;