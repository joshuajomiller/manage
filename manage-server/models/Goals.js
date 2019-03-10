const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: String,
    description: String,
    expiry: Date,
    status: String,
    tags: [String],
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    assigner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
