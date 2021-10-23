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

module.exports = {
  create,
};