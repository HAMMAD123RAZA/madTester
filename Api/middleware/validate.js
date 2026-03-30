import { body, validationResult } from 'express-validator';

export const validateCampaign = [
  body('name').notEmpty().withMessage('Campaign name is required'),
  body('client_id').isUUID().withMessage('Valid client_id (UUID) is required'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  body('status').isIn(['active', 'paused', 'completed']).withMessage('Status must be active, paused, or completed'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAuth = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
