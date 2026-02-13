const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
};

// @desc    Add a new task
// @route   POST /api/tasks
// @access  Private
const addTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({
        userId: req.user._id,
        title,
        description,
        status: 'pending',
    });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
};

// @desc    Update task status or details
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
        if (task.userId.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const { title, description, status, duration, startTime, endTime } = req.body;

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.duration = duration || task.duration;
        task.startTime = startTime || task.startTime;
        task.endTime = endTime || task.endTime;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); // Find the task first

        if (!task) {
            return res.status(404).json({ message: 'Task not found' }); // Handle not found
        }

        // Check ownership
        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Task.deleteOne({ _id: req.params.id }); // Use deleteOne with filter
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
