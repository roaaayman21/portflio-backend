const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true }  
});

module.exports = mongoose.model('Skill', SkillSchema);
