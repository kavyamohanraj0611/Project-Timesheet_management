const mongoose = require('mongoose')
const envFile = require('dotenv/config')
const express = require("express")
const cors = require('cors')
const employeesRouter = require("./routers/employeesRoute")
const projectsRouter = require("./routers/projectsRoute")
const timesheetRouter = require("./routers/timesheetsRoute")

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:4200' }))


mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => { console.log(err) })

app.use('/employee', employeesRouter)

app.use('/project', projectsRouter)

app.use('/timesheet', timesheetRouter)

app.listen(process.env.PORT, () => {
    console.log('Server is running at port :', process.env.PORT)
})