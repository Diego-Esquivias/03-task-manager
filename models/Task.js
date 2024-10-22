const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a task name'],
        trim: true,
        maxlength: [25, 'Task name must be at most 25 characters long']
    },
    completed: {
        type: Boolean,
        default: false
    }, 
})

module.exports = mongoose.model('Task', TaskSchema);