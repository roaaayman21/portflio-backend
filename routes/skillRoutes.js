const express = require('express');
const router = express.Router();
const { skillController, getSkills, upload, addSkill, updateSkill,deleteSkill } = require('../controllers/skillsController');

// Add a new skill
router.post('/skills', upload.single('photo'), addSkill);

// Get all skills
router.get('/skills', getSkills);

// Update an existing skill
router.put('/skills/:id', upload.single('photo'), updateSkill);
router.delete('/skills/:id', deleteSkill); // DELETE /api/skills/:id

module.exports = router;
