const { check } = require('express-validator');

const createContactValidator = [
  check('firstName').isLength({ min: 3, max: 50 })
    .withMessage('firstName length must be within 8 to 50 chars'),
  check('middleName').isLength({ min: 3, max: 50 })
    .withMessage('middleName length must be within 8 to 50 chars'),
  check('lastName').isLength({ min: 3, max: 50 })
    .withMessage('lastName length must be within 8 to 50 chars'),
  check('email').isEmail().withMessage('Invalid email'),
  check('mobile')
    .isLength({ min: 10, max: 10 })
    .withMessage('mobile must be 10 digit long')
    .matches(/^[0-9]*$/)
    .withMessage('mobile must only contain numbers'),
  check('mobileType').isIn(['home', 'work', 'mobile', 'homeFax', 'workFax'])
    .withMessage('mobileType value must match the given choices'),
];

const updateContactValidator = [
  check('etag').notEmpty().isString()
    .withMessage('The etag is must to update a contact'),
  check('firstName').optional().isLength({ min: 3, max: 50 })
    .withMessage('firstName length must be within 8 to 50 chars'),
  check('middleName').optional().isLength({ min: 3, max: 50 }).optional()
    .withMessage('middleName length must be within 8 to 50 chars'),
  check('lastName').optional().isLength({ min: 3, max: 50 })
    .withMessage('lastName length must be within 8 to 50 chars'),
  check('email').optional().isEmail().withMessage('Invalid email'),
  check('mobile').optional()
    .isLength({ min: 10, max: 10 })
    .withMessage('mobile must be 10 digit long')
    .matches(/^[0-9]*$/)
    .withMessage('mobile must only contain numbers'),
  check('mobileType').optional().isIn(['home', 'work', 'mobile', 'homeFax', 'workFax'])
    .withMessage('mobileType value must match the given choices'),
  check('photo').optional().isString()
    .withMessage('a base64 encoded image string'),
];

module.exports = {
  createContactValidator,
  updateContactValidator,
};
