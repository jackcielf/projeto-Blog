const Sequilize = require("sequelize");

const NAME_DATABASE = "wanderwave";
const USER = "root";
const PASS = "jakki";

const connection = new Sequilize(NAME_DATABASE, USER, PASS, {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00" // Usando o horario brasileiro
});

module.exports = connection;
