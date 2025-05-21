const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/document.category.controller");

router.post("/", categoryController.category_post);
router.put("/:categoryId", categoryController.category_put);
router.get("/", categoryController.categories_get);
router.get("/:categoryId", categoryController.category_get);

module.exports = router;
