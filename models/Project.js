const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  photo: { type: String, required: true }  
});

module.exports = mongoose.model('Project', ProjectSchema);
