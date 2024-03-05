const User = require('../models/auth');
const { generateRandomId } = require('../utils/generateRandomId');
const bcrypt = require('bcrypt');
require('dotenv').config();

const handleServerError = (res, err) => res.status(500).json({ message: `Server error: ${err.message}`, error: true });

const createUserInTheDatabase = async (req, res) => {
  try {
    const { name, email, password,
    } = req.body;
    const id = generateRandomId();
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      _id: id, name, email, password: passwordHash,
    });

    await user.save();

    return res.status(201).json({ message: 'User created successfully', error: false });
  } catch (err) {
    return handleServerError(res, err);
  }
};

module.exports = {
  createUserInTheDatabase
}
