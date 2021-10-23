const { User } = require('../models');

const validatePassword = (password) => {
  if (password.length < 6) {
    return {
      message: '"password" length must be 6 characters long',
    };
  }

  if (!password) {
    return {
      message: '"password" is required',
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

const create = async (displayName, email, password, image) => {
  if (displayName.length < 8) {
    return { message: '"displayName" length must be at least 8 characters long' };
  } 
  const isEmailValid = validateEmail(email);
  if (isEmailValid.message) return { message: isEmailValid.message };

  const isValidPassword = validatePassword(password);
  if (isValidPassword.message) return { message: isValidPassword.message };

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return { message: 'User already registered' };
  }

  const createUser = await User.create({ displayName, email, password, image });
  return createUser;
};

module.exports = {
  create,
};