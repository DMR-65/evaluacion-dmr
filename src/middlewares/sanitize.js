import { sanitizeObject } from '../utils/sanitizer.js';

export const sanitizeMiddleware = (req, res, next) => {
  try {
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Error sanitizando datos',
      error: error.message,
    });
  }
};
