const Skill = require('../models/Skill');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


exports.addSkill = async (req, res) => {
    try {
        const { name } = req.body;
        const photo = req.file ? req.file.filename : null;
        const skill = new Skill({ name, photo });
        await skill.save();
        res.json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateSkill = async (req, res) => {
    try {
        const { name } = req.body;
        const photo = req.file ? req.file.filename : null;

       
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

     
        if (name) skill.name = name;
        if (photo) skill.photo = photo;

       
        await skill.save();

        res.json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        res.json({ message: "Skill deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.upload = upload;
