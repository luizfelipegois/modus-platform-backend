const { Router } = require('express');
const {
  createUserInTheDatabase,
  userLogin
} = require('../controllers/auth');
const {
  validateName,
  validateEmail,
  validatePassword,
  checkPassword,
  validateIfUserExists
} = require('../middlewares/auth');

const router = Router();

router.post('/signUp', validateName, validateEmail, validatePassword, createUserInTheDatabase);
router.post('/signIn', validateIfUserExists, checkPassword, userLogin);

module.exports = router;
