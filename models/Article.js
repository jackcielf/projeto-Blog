const Sequelize = require("sequelize");
const connection = require("../database/db");
const Category = require('./Category');

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

Category.hasMany(Article); // UMA categoria has many artigos
Article.belongsTo(Category); // UM artigo belongs to UMA categoria

// Article.sync({ force: true });

module.exports = Article;
