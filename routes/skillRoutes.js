const express = require('express');
const router = express.Router();
const { skillController, getSkills, upload, addSkill, updateSkill,deleteSkill } = require('../controllers/skillsController');


router.post('/skills', upload.single('photo'), addSkill);


router.get('/skills', getSkills);


router.put('/skills/:id', upload.single('photo'), updateSkill);
router.delete('/skills/:id', deleteSkill); 

module.exports = router;
