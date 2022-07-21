const Employee = require('../models/employee')
const { ObjectId } = require('mongodb');
const { loginValidation, registerValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllEmployees = async (req, res) => {
    let employee;
    try {
        employee = await Employee.find().sort({ first_name: 1 })
    }
    catch (err) {
        return res.status(400).json("Error in reteriving employees data")
    }
    return res.status(200).json(employee)
}

const getOneEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let employee;
    try {
        employee = await Employee.findById(req.params.id)
    }
    catch (err) {
        return res.status(400).json("Error in reteriving employee data")
    }
    return res.status(200).json(employee)
}

const getLoginDetails = async (req, res) => {
    let employee;
    try {
        employee = await Employee.findOne({ employeeId: req.params.userId })
    }
    catch (err) {
        return res.status(400).json("Error in reteriving Login data")
    }
    return res.status(200).json(employee)
}

const signUpEmployee = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
    }
    catch (error) {
        return res.status(400).json(error.details[0])
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)

    let employee;
    try {
        const existUser = await Employee.findOne({ employeeId: req.body.employeeId })
        if (existUser)
            return res.status(400).json('Employee with same ID already exists')

        employee = new Employee({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            employeeId: req.body.employeeId,
            emailId: req.body.emailId,
            department: req.body.department,
            role: req.body.role,
            password: hashPassword
        })
        await employee.save()
    }
    catch (err) {
        return res.status(400).json("Error in signing-up the")
    }
    let payload = { id: employee._id }
    let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE })
    res.status(201).json({ token })

}

const loginEmployee = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
    }
    catch (error) {
        return res.status(400).json(error.details[0])
    }
    try {
        const user = await Employee.findOne({ employeeId: req.body.employeeId })
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass || !user)
            return res.status(401).json('Invalid credentials')
        let payload = { id: user._id }
        let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE })
        res.status(201).json({ user, token })
    }
    catch (err) {
        return res.status(400).json("Error in Login employee")
    }


}

const updateEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let employee;
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate = req.body;
        employee = await Employee.findById({ _id: idToUpdate }).updateOne(dataToUpdate)
    }
    catch (err) {
        return res.status(400).json("Error in updating the employee")
    }
    return res.status(200).json(employee)
}


const deleteEmployee = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let employee;
    try {
        const idToDelete = req.params.id;
        Employee.findById({ _id: idToDelete })
        employee = await Employee.deleteOne({ _id: new ObjectId(idToDelete) }).clone();
    }
    catch (err) {
        return res.status(400).json("Error in deleting the employee")
    }
    return res.status(200).json("Successfully deleted")
}

module.exports = { getAllEmployees, getOneEmployee, signUpEmployee, updateEmployee, deleteEmployee, loginEmployee, getLoginDetails }