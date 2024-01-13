const Sequelize = require("sequelize");
const connection = require("../database/db");

const NAME_TABLE = "tb_categories";

const Category = connection.define(NAME_TABLE, {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Category.sync({ force: true });

module.exports = Category;
