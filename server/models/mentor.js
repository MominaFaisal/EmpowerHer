const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  expertise: {
    type: String,
    required: [true, 'Expertise field is required'],
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true
  },
  bio: {
    type: String,
    maxLength: [500, 'Bio cannot exceed 500 characters']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  linkedin: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL']
  },
  github: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?github\.com\/.*$/, 'Please enter a valid GitHub URL']
  },
  youtube: {
    type: String,
    trim: true,
    match: [/^https?:\/\/(www\.)?youtube\.com\/.*$/, 'Please enter a valid YouTube URL']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);
