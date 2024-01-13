const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("categories route");
});

router.get("/admin/categories/new", (req, res) => {
  res.send("new categories route");
});

module.exports = router;