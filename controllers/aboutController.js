const About = require('../models/About');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.addAbout = async (req, res) => {
    try {
        const { description } = req.body;
        const photo = req.file ? req.file.filename : null;

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
        const photo = req.file ? req.file.filename : null;

        const updatedData = { description };
        if (photo) {
            updatedData.photo = photo;
        }

        const about = await About.findByIdAndUpdate(id, updatedData, { new: true });

        if (!about) {
            return res.status(404).json({ message: 'About section not found' });
        }

        res.json(about);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.upload = upload;
