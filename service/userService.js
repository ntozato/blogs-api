const { User } = require('../models');

const validatePassword = (password) => {
  if (!password) {
    return {
      message: '"password" is required',
    };
  }
  if (password.length < 6) {
    return {
      message: '"password" length must be 6 characters long',
    };
  }

  return true;
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  const isEmailValid = re.test(email);

  if (!email) {
    return {
      message: '"email" is required',
    };
  }
  
  if (!isEmailValid) {
    return {
      message: '"email" must be a valid email',
    };
  }
  
  return true;
};

const validateEmailLogin = (email) => {
  if (email === '') return { message: '"email" is not allowed to be empty', status: 400 };
  if (!email) return { message: '"email" is required', status: 400 };

  return true;
};

const validatePasswordLogin = (password) => {
  if (password === '') return { message: '"password" is not allowed to be empty', status: 400 };
  if (!password) return { message: '"password" is required', status: 400 };
  
  return true;
};

const create = async (displayName, email, password, image) => {
  if (displayName.length < 8) {
    return { message: '"displayName" length must be at least 8 characters long' };
  } 
  const isEmailValid = validateEmail(email);
  if (isEmailValid.message) return isEmailValid;
  
  const isValidPassword = validatePassword(password);
  if (isValidPassword.message) return isValidPassword;
  
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return { message: 'User already registered', status: 409 };
  }
  
  return User.create({ displayName, email, password, image });
};

const validateLogin = async (email, password) => {
  const isEmailValid = await validateEmailLogin(email);
  const isPasswordValid = await validatePasswordLogin(password);

  if (isEmailValid !== true) return isEmailValid;
  if (isPasswordValid !== true) return isPasswordValid;
  
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    return { message: 'Invalid fields', status: 400 };
  }

  return true;  
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { message: 'User does not exist', status: 404 };
  }

  return user;
};

module.exports = {
  create,
  validateLogin,
  getAll,
  getById,
};