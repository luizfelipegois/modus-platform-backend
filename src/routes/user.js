const { Router } = require('express');
const { getUserProfileData } = require('../controllers/user');
const { idExists, tokenIsValid } = require('../middlewares/user');

const router = Router();

router.get('/:id', idExists, tokenIsValid, getUserProfileData);

module.exports = router;
