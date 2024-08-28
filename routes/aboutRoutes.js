const express = require('express');
const router = express.Router();
const { getAbout, addAbout, updateAbout, upload } = require('../controllers/aboutController');

router.get('/about', getAbout); 
router.post('/about', upload.single('photo'), addAbout);
router.put('/about/:id', upload.single('photo'), updateAbout); 

module.exports = router;
