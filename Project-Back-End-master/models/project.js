const mongoose = require('mongoose')
const project = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    technologies: {
        type: Array,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('project', project)