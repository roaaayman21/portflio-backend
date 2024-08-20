const express = require('express');
const router = express.Router();
const { getProjects, addProject, updateProject,deleteProject ,upload } = require('../controllers/projectController');

// Add a new project
router.post('/projects', upload.single('photo'), addProject);

// Get all projects
router.get('/projects', getProjects);

// Update an existing project
router.put('/projects/:id', upload.single('photo'), updateProject);
router.delete('/projects/:id', deleteProject); // DELETE /api/projects/:id

module.exports = router;
