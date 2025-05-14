// routes/experienceRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getExperiences, 
    addExperience, 
    updateExperience, 
    deleteExperience 
} = require('../controllers/experienceController');

router.post('/experiences', addExperience);
router.get('/experiences', getExperiences);
router.put('/experiences/:id', updateExperience);
router.delete('/experiences/:id', deleteExperience);

module.exports = router;
