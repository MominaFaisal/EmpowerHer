const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const auth = require('../middleware/auth');

router.post('/profile', auth, async (req, res) => {
  try {
    const mentorEmail = req.user.email;
    const {
      name,
      expertise,
      experience,
      bio,
      contactEmail,
      linkedin,
      github,
      youtube
    } = req.body;

    let mentor = await Mentor.findOne({ email: mentorEmail });

    const profileData = {
      name,
      expertise,
      experience,
      bio,
      contactEmail,
      linkedin,
      github,
      youtube
    };

    if (mentor) {
      mentor = await Mentor.findOneAndUpdate(
        { email: mentorEmail },
        profileData,
        { new: true, runValidators: true }
      );
      return res.status(200).json(mentor);
    } else {
      const newProfile = new Mentor({
        ...profileData,
        email: mentorEmail
      });
      const createdProfile = await newProfile.save();
      return res.status(201).json(createdProfile);
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error processing mentor profile',
      error: error.message
    });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ email: req.user.email })
      .select('-__v')
      .lean();

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor profile not found' });
    }

    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching mentor profile',
      error: error.message
    });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const mentors = await Mentor.find({ 
      email: { $ne: req.user.email } 
    })
    .select('name email expertise experience bio contactEmail linkedin github youtube')
    .lean();

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching mentors',
      error: error.message
    });
  }
});

module.exports = router;