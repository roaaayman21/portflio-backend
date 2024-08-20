const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add a Project
exports.addProject = async (req, res) => {
    try {
        const { name, title, link } = req.body;  // Ensure 'title' is included here
        const photo = req.file ? req.file.filename : null;
        const project = new Project({ name, title, link, photo }); // 'title' is now passed correctly
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all Projects
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
        const { name, title, link } = req.body;
        const photo = req.file ? req.file.filename : null;

        // Find the project by ID and update it
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update the fields
        if (name) project.name = name;
        if (title) project.title = title;
        if (link) project.link = link;
        if (photo) project.photo = photo;

        // Save the updated project
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
// Export upload middleware
exports.upload = upload;
