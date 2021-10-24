const service = require('../service/blogPostService');

const create = async (req, res) => {
  const { id } = req.user;
  const { title, content, categoryIds } = req.body;
  const createPost = await service.create(title, content, categoryIds, id);
  
  if (createPost.message) {
    return res.status(400).json({ message: createPost.message });
  }

  return res.status(201).json(createPost);
};

module.exports = {
  create,
};