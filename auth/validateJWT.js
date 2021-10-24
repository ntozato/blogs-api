const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'mytokensecret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const payload = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: payload.userData.email } });

  if (!user) {
    return res.status(401).json({ message: 'user not found' });
  }

  req.user = user;
  next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};