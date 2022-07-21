const express = require('express')
const router = express.Router()
const { getAllProjects, getOneProject, addProject, deleteProject } = require('../controllers/projectController')
const { isAuthenticatedUser } = require('../middlewares/auth')

router.get('/',isAuthenticatedUser, getAllProjects)

router.get('/:id',isAuthenticatedUser, getOneProject)

router.post('/add-project',isAuthenticatedUser, addProject)

router.delete('/delete/:id',isAuthenticatedUser, deleteProject)

module.exports = router
