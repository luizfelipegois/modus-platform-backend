const User = require('../models/auth');
const { generateRandomId } = require('../utils/generateRandomId');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const handleServerError = (res, err) => res.status(500).json({ message: `Server error: ${err.message}`, error: true });
const secret = process.env.SECRET;

const getUserProfileData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password');

    return res.status(200).json({ message: 'Autenticado com sucesso', error: false, user });
  } catch (err) {
    return handleServerError(res, err);
  }
};

module.exports = {
  getUserProfileData
}
