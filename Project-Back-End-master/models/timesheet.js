const mongoose = require('mongoose')
const timesheet = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timesheet_name: {
        type: String,
        required: true
    },
    addedBy: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('timesheet', timesheet)
