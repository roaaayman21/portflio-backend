// controllers/projectController.js
const Project = require('../models/Project');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');  // Import Cloudinary storage
const upload = multer({ storage });

exports.addProject = async (req, res) => {
    try {
     const { name, title, link, skills, githubLink } = req.body;
const parsedSkills = skills ? JSON.parse(skills) : [];
const photo = req.file ? req.file.path : null;

const project = new Project({ 
  name, 
  title, 
  link,           
  photo, 
  skills: parsedSkills, 
  githubLink 
});
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
       const { name, title, link, skills, githubLink } = req.body;
const parsedSkills = skills ? JSON.parse(skills) : null;

const project = await Project.findById(req.params.id);
if (!project) return res.status(404).json({ message: 'Project not found' });

if (name) project.name = name;
if (title) project.title = title;
if (link) project.link = link;
if (parsedSkills) project.skills = parsedSkills;
if (githubLink) project.githubLink = githubLink;
if (req.file) project.photo = req.file.path;

await project.save();
res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.upload = upload;
