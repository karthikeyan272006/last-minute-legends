const Report = require('../models/Report');
const Task = require('../models/Task');
const Log = require('../models/Log');

// @desc    Get reports
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
    const reports = await Report.find({ userId: req.user._id }).sort({ createAt: -1 });
    res.json(reports);
};

// @desc    Generate a report with AI summary (Mocked for now)
// @route   POST /api/reports
// @access  Private
const generateReport = async (req, res) => {
    const { type, startDate, endDate } = req.body;

    // 1. Fetch data
    const logs = await Log.find({
        userId: req.user._id,
        date: { $gte: startDate, $lte: endDate }
    }).populate('tasks');

    // 2. Aggregate data
    let totalTasks = 0;
    let totalTime = 0;
    let tasksDetails = [];

    logs.forEach(log => {
        totalTime += log.totalTime;
        log.tasks.forEach(task => {
            totalTasks++;
            tasksDetails.push(`- ${task.title}: ${task.status} (${task.duration}s)`);
        });
    });

    // 3. Generate AI Summary (Mock)
    // In a real scenario, send `tasksDetails` to OpenAI API
    const aiSummary = `Productivity Analysis (${type}):\n` +
        `Over the period from ${startDate} to ${endDate}, you completed ${totalTasks} tasks ` +
        `and spent a total of ${(totalTime / 3600).toFixed(2)} hours working. ` +
        `Most of your time was spent on meaningful activities. Good job maintaining focus!`;

    // 4. Save Report
    const report = new Report({
        userId: req.user._id,
        type,
        summaryText: aiSummary,
        startDate,
        endDate
    });

    const createdReport = await report.save();
    res.status(201).json(createdReport);
};

module.exports = { getReports, generateReport };
