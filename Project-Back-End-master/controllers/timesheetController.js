const Timesheet = require('../models/timesheet')
const { ObjectId } = require('mongodb');

const getAllTimesheets = async (req, res, next) => {
    let timesheet;
    try {
        timesheet = await Timesheet.find().sort({date:-1})
    }
    catch (err) {
        return res.status(400).json( "Error in reteriving timesheets data" )
    }
    return res.status(200).json(timesheet)
}

const getOneTimesheet = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let timesheet;
    try {
        const idToFind = req.params.id;
        timesheet = await Timesheet.findById({ _id: (idToFind) })
    }
    catch (err) {
        return res.status(400).json( "Error in reteriving timesheet details" )
    }
    return res.status(200).json(timesheet)
}

const getMyTimesheets=async(req,res)=>{
    let timesheet;
    try{
        const idToFind=req.params.id;
        timesheet=await Timesheet.find({addedBy:idToFind}).sort({date:-1})
    }
    catch(err){
        return res.status(400).json("Error in reteriving timesheets data")
    }
    return res.status(200).json(timesheet)
}

const addTimesheet = async (req, res) => {
    let timesheet;
    try {
        timesheet = new Timesheet(req.body)
        await timesheet.save()
    }
    catch (err) {
        return res.status(400).json( "Error in adding timesheet" )
    }
    return res.status(200).json(timesheet)
}

const updateTimesheet = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let timesheet;
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate = req.body;
        timesheet = await Timesheet.findById({ _id: idToUpdate }).updateOne(dataToUpdate)
    }
    catch (err) {
        return res.status(400).json( "Error in updating timesheet data" )
    }
    return res.status(200).json(timesheet)
}


const deleteTimesheet = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let timesheet;
    try {
        const idToDelete = req.params.id;
        
        timesheet = await Timesheet.deleteOne({ _id: new ObjectId(idToDelete) }).clone();
    }
    catch (err) {
        return res.status(400).json( "Error in deleting timesheet data" )
    }
    return res.status(200).json( "Successfully deleted" )
}

module.exports = { getAllTimesheets, getOneTimesheet, addTimesheet, getMyTimesheets, updateTimesheet, deleteTimesheet }