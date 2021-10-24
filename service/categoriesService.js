const { Category } = require('../models');

const create = async (name) => {
  if (!name) {
    return { message: '"name" is required' };
  }

  const createCategory = await Category.create({ name });
  return createCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};