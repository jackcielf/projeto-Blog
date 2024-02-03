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

// ROUTES
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  Article.findAll({ order: [["id", "desc"]], limit: 4 }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", {
        articles: articles,
        categories: categories,
      });
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
      Category.findAll().then((categories) => {
        res.render("article-detail", {
          article: article,
          categories: categories,
        });
      });
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;

  Category.findOne({
    row: true,
    where: {
      slug: slug,
    },
  })
    .then((category) => {
      if (category) {
        Category.findAll().then((categories) => {
          Article.findAll().then((articles) => {
            if (categories && articles) {
              articles.forEach((article) => {
                if (
                  article.dataValues.tbCategoryId === category.dataValues.id
                ) {
                  categories.unshift([article]);
                }
              });

              res.render("index", {
                articles: categories[0],
                categories: categories,
              });
            }
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
});
