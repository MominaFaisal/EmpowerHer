const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Mentorship = require('../models/mentorship');

router.post('/request', auth, async (req, res) => {
  try {
    const { mentorEmail } = req.body;
    const menteeEmail = req.user.email;

    const existingRequest = await Mentorship.findOne({
      mentor: mentorEmail,
      mentee: menteeEmail
    });

    if (existingRequest && existingRequest.status != "rejected") {
      return res.status(400).json({ 
        message: 'Mentorship request already exists' 
      });
    }

    const mentorship = new Mentorship({
      mentor: mentorEmail,
      mentee: menteeEmail
    });

    await mentorship.save();

    res.status(201).json({ 
      message: 'Mentorship request sent successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating mentorship request', 
      error: error.message 
    });
  }
});

router.post('/respond', auth, async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const mentorEmail = req.user.email;

    const mentorship = await Mentorship.findById(requestId);
    
    if (!mentorship) {
      return res.status(404).json({ 
        message: 'Mentorship request not found' 
      });
    }

    if (mentorship.mentor !== mentorEmail) {
      return res.status(403).json({ 
        message: 'Not authorized to respond to this request' 
      });
    }

    mentorship.status = status;
    await mentorship.save();

    if (status === 'accepted') {
      await User.findOneAndUpdate(
        { email: mentorEmail },
        { $addToSet: { mentees: mentorship.mentee } }
      );

      await User.findOneAndUpdate(
        { email: mentorship.mentee },
        { $addToSet: { mentors: mentorEmail } }
      );
    }

    res.json({ 
      message: `Mentorship request ${status}` 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error responding to request', 
      error: error.message 
    });
  }
});

router.get('/my-mentees', auth, async (req, res) => {
  try {
    const mentorEmail = req.user.email;
    const acceptedMentorships = await Mentorship.find({
      mentor: mentorEmail,
      status: 'accepted'
    }).lean();

    const menteeEmails = acceptedMentorships.map(m => m.mentee);
    const mentees = await User.find(
      { email: { $in: menteeEmails } },
      'userName email'  
    ).lean();

    const menteeStartDates = Object.fromEntries(
      acceptedMentorships.map(m => [m.mentee, m.createdAt])
    );

    const menteesWithDates = mentees.map(mentee => ({
      ...mentee,
      startDate: menteeStartDates[mentee.email]
    }));

    res.json(menteesWithDates);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching mentees', 
      error: error.message 
    });
  }
});

router.get('/pending-requests', auth, async (req, res) => {
  try {
    const mentorEmail = req.user.email;
    const requests = await Mentorship.find({
      mentor: mentorEmail,
      status: 'pending'
    }).lean();

    const menteeEmails = requests.map(r => r.mentee);
    const mentees = await User.find(
      { email: { $in: menteeEmails } },
      'name email'
    ).lean();

    const menteeMap = Object.fromEntries(
      mentees.map(m => [m.email, m])
    );

    const enrichedRequests = requests.map(request => ({
      ...request,
      mentee: menteeMap[request.mentee]
    }));

    res.json(enrichedRequests);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching requests', 
      error: error.message 
    });
  }
});

router.delete('/remove-mentee/:menteeEmail', auth, async (req, res) => {
  try {
    const mentorEmail = req.user.email;
    const { menteeEmail } = req.params;

    const mentorship = await Mentorship.findOneAndUpdate(
      { 
        mentor: mentorEmail, 
        mentee: menteeEmail,
        status: 'accepted'  
      },
      { status: 'rejected' }
    );

    if (!mentorship) {
      return res.status(404).json({ 
        message: 'Mentorship relationship not found' 
      });
    }

    await User.findOneAndUpdate(
      { email: mentorEmail },
      { $pull: { mentees: menteeEmail } }
    );

    await User.findOneAndUpdate(
      { email: menteeEmail },
      { $pull: { mentors: mentorEmail } }
    );

    res.json({ 
      message: 'Mentee removed successfully',
      menteeEmail: menteeEmail 
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: 'Error removing mentee', 
      error: error.message 
    });
  }
});

router.get('/status', auth, async (req, res) => {
  try {
    const userEmail = req.user.email;

    const mentorships = await Mentorship.find({
      mentee: userEmail,
      status: { $in: ['pending', 'accepted'] } 
    }).lean();

    const statusMap = {};
    mentorships.forEach(m => {
      if (m.status === 'accepted') {
        statusMap[m.mentor] = 'mentee';
      } else if (m.status === 'pending') {
        statusMap[m.mentor] = 'pending';
      }
    });

    res.json(statusMap);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching mentorship status', 
      error: error.message 
    });
  }
});

module.exports = router;