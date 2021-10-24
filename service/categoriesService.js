const { Category } = require('../models');

const create = async (name) => {
  if (!name) {
    return { message: '"name" is required' };
  }

  const createCategory = await Category.create({ name });
  return createCategory;
};

module.exports = {
  create,
};