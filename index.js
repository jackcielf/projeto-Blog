const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");

// CONTROLLERS
const categoriesController = require("./controlles/CategoriesController");
const articlesController = require("./controlles/ArticlesController");

PORT = 8080;

// VIEW ENGINE
app.set("view engine", "ejs");

// STATIC
app.use(express.static("public"));

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DATABASE CONNECT
connection
  .authenticate()
  .then(() => {
    console.log("Connection to database: SUCCESS");
  })
  .catch((err) => {
    console.log("Connection to database: FAILED\n" + err);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", categoriesController);
app.use("/", articlesController);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
