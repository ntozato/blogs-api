const validateName = (displayName) => {
  if (displayName.length < 8) {
    return {
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  return false;
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  const isEmailValid = re.test(email);
  
  if (!isEmailValid) {
    return {
      message: '"email" must be a valid email',
    };
  }
  
  if (!email) {
    return {
      message: '"email" is required',
    };
  }
  return true;
};

const validatePassword = (password) => {
  if (password.length !== 6) {
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

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};