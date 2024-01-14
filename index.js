const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db");

// CONTROLLERS
const categoriesController = require("./controlles/CategoriesController");
const articlesController = require("./controlles/ArticlesController");

// MODELS
const Article = require("./models/Article");
const Category = require("./models/Category");

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
  Article.findAll({ order: [["id", "desc"]] }).then((articles) => {
    res.render("index", {
      articles: articles,
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;

  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      res.render("article-detail", {
        article: article,
      });
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.use("/", categoriesController);
app.use("/", articlesController);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
