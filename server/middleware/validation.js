const validateMentorProfile = (req, res, next) => {
    const { name, expertise, experience, contactEmail } = req.body;
    
    if (!name || !expertise || !experience || !contactEmail) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }
  
    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({
        message: 'Invalid email format'
      });
    }
  
    next();
  };
  
  module.exports = {
    validateMentorProfile
  };