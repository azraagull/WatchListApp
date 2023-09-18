const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController.js");

router.get("/categories", categoriesController.getCategories);

module.exports = router;
