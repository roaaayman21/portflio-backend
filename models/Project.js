const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String },
  photo: { type: String, required: true },
  skills: [{ type: String }],
  githubLink: { type: String }             
});

module.exports = mongoose.model('Project', ProjectSchema);
