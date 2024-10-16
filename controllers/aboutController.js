// controllers/aboutController.js
const About = require('../models/About');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');  // Import Cloudinary storage
const upload = multer({ storage });


exports.addAbout = async (req, res) => {
    try {
        const { description } = req.body;
        const photo = req.file ? req.file.path : null;  // Cloudinary path

        const about = await About.findOneAndUpdate(
            {},
            { description, photo },
            { new: true, upsert: true }
        );

        res.json(about);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const photo = req.file ? req.file.path : null;

        const updatedData = { description };
        if (photo) updatedData.photo = photo;

        const about = await About.findByIdAndUpdate(id, updatedData, { new: true });

        if (!about) return res.status(404).json({ message: 'About section not found' });

        res.json(about);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.upload = upload;
