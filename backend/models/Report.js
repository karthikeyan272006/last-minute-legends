const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    type: {
        type: String, // daily, weekly, monthly
        required: true,
    },
    summaryText: {
        type: String,
    },
    generatedAt: {
        type: Date,
        default: Date.now,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    }
}, {
    timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
