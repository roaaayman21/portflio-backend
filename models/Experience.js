const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    company: { 
        type: String, 
        required: true 
    },
    from: { 
        type: Date, 
        required: true 
    },
    to: { 
        type: Date,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
