const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
    totalTime: {
        type: Number, // seconds
        default: 0,
    },
}, {
    timestamps: true,
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;
