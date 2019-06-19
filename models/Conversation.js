const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    lastMessage: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('conversations', ConversationSchema);
