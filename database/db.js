const Sequilize = require("sequelize");

const NAME_DATABASE = "wanderwave";
const USER = "root";
const PASS = "jakki";

const connection = new Sequilize(NAME_DATABASE, USER, PASS, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
