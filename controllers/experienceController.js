// controllers/experienceController.js
const Experience = require('../models/Experience');

exports.addExperience = async (req, res) => {
    try {
        const { title, company, from, to } = req.body;
        
        // Validate required fields
        if (!title || !company || !from) {
            return res.status(400).json({ error: 'Title, company, and from date are required' });
        }

        const experience = new Experience({ 
            title, 
            company, 
            from, 
            to 
        });
        
        await experience.save();
        res.status(201).json(experience);
    } catch (error) {
        console.error('Error adding experience:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ from: -1 }); // Sort by date, newest first
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateExperience = async (req, res) => {
    try {
        const { title, company, from, to } = req.body;
        
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        // Update fields if provided
        if (title) experience.title = title;
        if (company) experience.company = company;
        if (from) experience.from = from;
        if (to !== undefined) experience.to = to;

        await experience.save();
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(404).json({ message: "Experience not found" });
        res.json({ message: "Experience deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
