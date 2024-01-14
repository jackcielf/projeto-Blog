const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Article = require("../models/Article");
const slugify = require("slugify");

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", {
      categories: categories,
    });
  });
});

// CREATE
router.post("/articles/save", (req, res) => {
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  if (title) {
    Article.create({
      title: title,
      slug: slugify(title),
      body: body,
      tbCategoryId: category,
    }).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/admin/articles/new");
  }
});

// READ
router.get("/admin/articles", (req, res) => {
  Article.findAll({
    order: [["id", "asc"]]
  }).then((articles) => {
    res.render("admin/articles/index", {
      articles: articles,
    });
  });
});

// UPDATE
router.post("/admin/articles/update", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

  Article.update(
    {
      title: title,
      slug: slugify(title),
      body: body,
      tbCategoryId: category
    },
    {
      where: { id: id },
    }
  ).then(() => {
    res.redirect("/admin/articles");
  });
});

// DELETE
router.post("/articles/delete", (req, res) => {
  var id = req.body.id;

  if (id) {
    if (!isNaN(id)) {
      Article.destroy({
        where: { id: id },
      }).then(() => {
        res.redirect("/admin/articles");
      });
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/admin/articles");
  }

  Article.findByPk(id).then((article) => {
    if (article) {
      Category.findAll().then((categories) => {
        res.render("admin/articles/edit", {
          article: article,
          categories: categories,
        });
      });
    } else {
      res.redirect("/admin/articles");
    }
  });
});

module.exports = router;
