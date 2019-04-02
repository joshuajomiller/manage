const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    expiry: Date,
    status: String,
    tags: [String],
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    assigner: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: String
}, {timestamps: true});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
