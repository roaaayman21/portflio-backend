const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true }  // Add photo field
});

module.exports = mongoose.model('Skill', SkillSchema);
