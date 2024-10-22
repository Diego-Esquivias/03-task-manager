const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
})

const createTask = asyncWrapper(async (req, res) => {
    const task = Task.create(req.body)
    console.log(req.body) // To check what is being made for dev only...
    res.status(201).json({task});
})

const getTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID});
    if (!task) {
        return next(createCustomError('No Task with id ' + taskID, 404));
    }
    res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError('No Task with id'+ taskID, 404));
    }
    res.status(200).json({task}); // Responds with the task that was deleted
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params

    // Third Parameter uses the validators that we define in the model options
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, 
        runValidators: true
    });
    if (!task) {
        return next(createCustomError('No Task with id'+ taskID, 404));
    }
    res.status(200).json({task: task}); // Responds with the updated task
})

module.exports = {getAllTasks, createTask, getTask, deleteTask, updateTask}