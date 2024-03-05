const User = require('../models/auth');
const { generateRandomId } = require('../utils/generateRandomId');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const handleServerError = (res, err) => res.status(500).json({ message: `Server error: ${err.message}`, error: true });
const secret = process.env.SECRET;

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

    return res.status(201).json({ message: 'Usuário criado com sucesso', error: false });
  } catch (err) {
    return handleServerError(res, err);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const { _id } = await User.findOne({ email });
    const token = await jwt.sign({ id: _id }, secret, { expiresIn: 1800 });

    return res.status(200).json({ message: 'Autenticado com sucesso', error: false, token });
  } catch (err) {
    return handleServerError(res, err);
  }
};

module.exports = {
  createUserInTheDatabase,
  userLogin
}
