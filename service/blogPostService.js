const { BlogPost, Category } = require('../models');

const validateCategory = async (categoryIds) => {
  const validIds = await Category.findAll({ where: { id: categoryIds } });
  if (validIds.length !== categoryIds.length) {
    return { message: '"categoryIds" not found' };
    }
    return true;
};

const create = async (title, content, categoryIds, userId) => {
  if (!title) return { message: '"title" is required' };
  if (!content) return { message: '"content" is required' };
  if (!categoryIds) return { message: '"categoryIds" is required' };
  
  const isValidCategory = await validateCategory(categoryIds);
  if (isValidCategory.message) return isValidCategory;
  const post = await BlogPost.create({ title, content, userId });
  return post;
};

module.exports = {
  create,
  validateCategory,
};