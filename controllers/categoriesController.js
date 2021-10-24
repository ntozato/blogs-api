const service = require('../service/categoriesService');

const create = async (req, res) => {
  const { name } = req.body;
  const createCategory = await service.create(name);
  if (createCategory.message) {
    return res.status(400).json({ message: createCategory.message });
  }
  return res.status(201).json(createCategory);
};

module.exports = {
  create,
};