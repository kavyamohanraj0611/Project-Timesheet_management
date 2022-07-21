const express = require('express')
const { getAllTimesheets, getOneTimesheet, addTimesheet, getMyTimesheets, updateTimesheet, deleteTimesheet } = require('../controllers/timesheetController')
const router = express.Router()
const { isAuthenticatedUser } = require('../middlewares/auth')

router.get('/',isAuthenticatedUser, getAllTimesheets)

router.get('/:id',isAuthenticatedUser, getOneTimesheet)

router.get('/timesheet-list/:id',isAuthenticatedUser,getMyTimesheets)

router.post('/',isAuthenticatedUser, addTimesheet)

router.put('/update/:id',isAuthenticatedUser, updateTimesheet)

router.delete('/delete/:id',isAuthenticatedUser, deleteTimesheet)

module.exports = router
