const jwt = require('jsonwebtoken');
const service = require('../service/userService');

const secret = 'mytokensecret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const createUser = await service.create(displayName, email, password, image);

  if (createUser.message) {
    return res.status(createUser.status || 400).json({ message: createUser.message });
  }

  const userData = {
    displayName,
    email,
    image,
  };

  const userToken = jwt.sign({ userData }, secret, jwtConfig);

  res.status(201).json({ token: userToken });
};

module.exports = {
  create,
};