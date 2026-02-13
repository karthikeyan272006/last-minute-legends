const Log = require('../models/Log');
const Task = require('../models/Task');

// @desc    Get logs for a user
// @route   GET /api/logs
// @access  Private
const getLogs = async (req, res) => {
    const logs = await Log.find({ userId: req.user._id }).populate('tasks');
    res.json(logs);
};

// @desc    Create or update log for today
// @route   POST /api/logs
// @access  Private
const createOrUpdateLog = async (req, res) => {
    const { date, taskId, timeSpent } = req.body; // date YYYY-MM-DD

    let log = await Log.findOne({ userId: req.user._id, date });

    if (log) {
        // Update existing log
        if (taskId && !log.tasks.includes(taskId)) {
            log.tasks.push(taskId);
        }
        log.totalTime += timeSpent || 0;
        await log.save();
        res.json(log);
    } else {
        // Create new log
        const newLog = new Log({
            userId: req.user._id,
            date,
            tasks: taskId ? [taskId] : [],
            totalTime: timeSpent || 0,
        });
        const createdLog = await newLog.save();
        res.status(201).json(createdLog);
    }
};

module.exports = { getLogs, createOrUpdateLog };
