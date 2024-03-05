const { Router } = require('express');
const {
  createUserInTheDatabase
} = require('../controllers/auth');
const {
  validateName,
  validateEmail,
  validatePassword
} = require('../middlewares/auth');

const router = Router();

router.post('/signUp', validateName, validateEmail, validatePassword, createUserInTheDatabase);

module.exports = router;
