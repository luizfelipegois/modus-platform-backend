const jwt = require('jsonwebtoken');
const User = require('../models/auth');

async function tokenIsValid (req, res, next) {
  try {
    const { token } = req.headers;
    const secret = process.env.SECRET;
    const { id } = req.params;

    if (!token) return res.status(511).json({ message: 'Token é necessario', error: true });
    if (!jwt.verify(token, secret)) return res.status(511).json({ message: 'Acesso negado', error: true });

    const data = jwt.decode(token, { payload: true });

    if (id !== data.id) return res.status(511).json({ message: 'Acesso negado', error: true });

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Acesso negado', error: true, errorMessage: error });
  }
}

async function idExists (req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(422).json({ message: 'Usuário não encontrado', error: true });

    return next();
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}'`, error: true });
  }
}

module.exports = {
  tokenIsValid,
  idExists
};
