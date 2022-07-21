const mongoose = require('mongoose')

const employee = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
})


module.exports = mongoose.model('employee', employee)