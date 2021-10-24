const Category = (sequelize, DataTypes) => {
  const user = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  return user;
};

module.exports = Category;