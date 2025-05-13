const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  mentor: {
    type: String, // Email address of mentor
    required: true,
    trim: true
  },
  mentee: {
    type: String, // Email address of mentee
    required: true,
    trim: true
  },  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Mentorship = mongoose.model('Mentorship', mentorshipSchema);
module.exports = Mentorship;
