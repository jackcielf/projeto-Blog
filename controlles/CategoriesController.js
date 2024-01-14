const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

// CREATE
router.post("/categories/save", (req, res) => {
  var title = req.body.title;

  if (title) {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

// READ
router.get("/admin/categories", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", {
      categories: categories,
    });
  });
});

// UPDATE
router.post("/admin/categories/update", (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update(
    {
      title: title,
      slug: slugify(title),
    },
    {
      where: { id: id },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

// DELETE
router.post("/categories/delete", (req, res) => {
  var id = req.body.id;

  if (id) {
    if (!isNaN(id)) {
      Category.destroy({
        where: { id: id },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/admin/categories");
  }

  Category.findByPk(id).then((category) => {
    if (category) {
      res.render("admin/categories/edit", {
        category: category,
      });
    } else {
      res.redirect("/admin/categories");
    }
  });
});

module.exports = router;
