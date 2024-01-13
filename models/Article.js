const Sequelize = require("sequelize");
const connection = require("../database/db");

const NAME_TABLE = "tb_articles";

const Article = connection.define(NAME_TABLE, {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Article;
