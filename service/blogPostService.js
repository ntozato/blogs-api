const { BlogPost, Category, User } = require('../models');

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

const getAll = async () => {
  const listAll = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  return listAll;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (!post) {
    return { message: 'Post does not exist' };
  }

  return post;
};

module.exports = {
  create,
  validateCategory,
  getAll,
  getById,
};