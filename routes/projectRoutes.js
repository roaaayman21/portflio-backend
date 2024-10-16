// routes/projects.js
const express = require('express');
const router = express.Router();
const { getProjects, addProject, updateProject, deleteProject, upload } = require('../controllers/projectController');

router.post('/projects', upload.single('photo'), addProject);
router.get('/projects', getProjects);
router.put('/projects/:id', upload.single('photo'), updateProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;
