const express = require('express')
const { getAllEmployees, getOneEmployee, signUpEmployee, updateEmployee, deleteEmployee, loginEmployee ,getLoginDetails} = require('../controllers/employeeController')
const router = express.Router()
const { isAuthenticatedUser } = require('../middlewares/auth')

router.get('/', isAuthenticatedUser, getAllEmployees)

router.get('/:id', isAuthenticatedUser, getOneEmployee)

router.post('/sign-up', signUpEmployee)

router.post('/login', loginEmployee)

router.get('/login/login-data/:userId',isAuthenticatedUser,getLoginDetails )

router.put('/update/:id', isAuthenticatedUser, updateEmployee)

router.delete('/delete/:id', isAuthenticatedUser, deleteEmployee)

module.exports = router