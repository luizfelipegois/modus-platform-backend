const User = require('../models/auth');
const bcrypt = require('bcrypt');

const validateName = (req, res, next) => {
  try {
    const { name } = req.body;
    const regex = /^[a-zA-ZÀ-ÿ ]+$/;

    if (!name) return res.status(422).json({ message: 'Nome é necessário', error: true });
    if (name.length < 3) return res.status(422).json({ message: 'O nome requer no mínimo 3 caracteres', error: true });
    if (!regex.test(name)) return res.status(422).json({ message: 'O nome não pode conter números ou caracteres especiais (@, $, !, %, *, ?, ou &)', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const user = await User.findOne({ email });

    if (!email) return res.status(422).json({ message: 'Email é necessário', error: true });
    if (!regex.test(email)) return res.status(422).json({ message: 'Formato de Email Inválido', error: true });
    if (user) return res.status(422).json({ message: 'Email já registrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const validatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) return res.status(422).json({ message: 'Senha é necessária', error: true });
    if (!regex.test(password)) return res.status(422).json({ message: 'A senha deve conter pelo menos 8 caracteres e incluir pelo menos um caractere minúsculo, um caractere maiúsculo, um dígito e um caractere especial (@, $, !, %, *, ?, ou &)', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
};

const validateIfUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!email) return res.status(422).json({ message: 'Email é necessário', error: true });
    if (!user) return res.status(422).json({ message: 'Usuário não encontrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
}

const checkPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password) return res.status(422).json({ message: 'Senha é necessária', error: true });

    const user = await User.findOne({ email });
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) return res.status(422).json({ message: 'Senha incorreta', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateIfUserExists,
  checkPassword
}
