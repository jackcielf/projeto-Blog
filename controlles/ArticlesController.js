const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Articles = require("../models/Articles");
const slugify = require('slugify');

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", {
      categories: categories,
    });
  });
});

module.exports = router;
