const Project = require('../models/project')
const { ObjectId } = require('mongodb');

const getAllProjects = async (req, res) => {
    let project;
    try {
        project = await Project.find().sort({ deadline: 1 })
    }
    catch (err) {
        return res.status(400).json("Error in reteriving projects data")
    }
    return res.status(200).json(project)
}

const getOneProject = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let project;
    try {
        const idToFind = req.params.id;
        project = await Project.findById({ _id: (idToFind) })
    }
    catch (err) {
        return res.status(400).json("Error in reteriving project data")
    }
    return res.status(200).json(project)
}


const addProject = async (req, res) => {
    let project;
    try {
        project = new Project({
            _id: req.body._id,
            title: req.body.title,
            description: req.body.description,
            technologies: req.body.technologies,
            createdOn: req.body.createdOn,
            deadline: req.body.deadline
        })
        console.log(req.body)
        console.log(project)
        await project.save()
    }

    catch (err) {
        return res.status(400).json("Error in adding project")
    }
    return res.status(200).json(project)
}

const updateProject = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let project;
    try {
        const idToUpdate = req.params.id;
        const dataToUpdate = req.body;
        project = await Project.findById({ _id: idToUpdate }).updateOne(dataToUpdate)
    }
    catch (err) {
        return res.status(400).json("Error in updating project details")
    }
    return res.status(200).json(project)
}

const deleteProject = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id `);
    let project;
    try {
        const idToDelete = req.params.id;
        project = await Project.deleteOne({ _id: new ObjectId(idToDelete) }).clone();
    }
    catch (err) {
        return res.status(400).json("Error in deleting project")
    }
    return res.status(200).json("Successfully deleted")
}

module.exports = { getAllProjects, getOneProject, addProject, updateProject, deleteProject }