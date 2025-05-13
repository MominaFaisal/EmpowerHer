const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token found'
      });
    }


    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

module.exports = auth;