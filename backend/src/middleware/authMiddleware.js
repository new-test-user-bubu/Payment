import User from '../models/User.js';
import { verifyToken } from '../utils/generateToken.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);
      
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Authorization denied.',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expired. Please login again.',
        });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Authorization denied.',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Authorization failed.',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Authorization denied.',
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
    next();
  };
};
