const categoryService = require("../services/document.category.service");
const joiSchemas = require("../validation/document.category.schemas");

exports.category_post = async (req, res) => {
  try {
    const data = await joiSchemas.category_post.validateAsync(req.body);
    const category = await categoryService.createCategory(data);
    return res.success(category);
  } catch (error) {
    console.error("DocumentCategoryController [category_post] Error:", error);
    return res.serverError(error);
  }
};

exports.category_put = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await joiSchemas.category_put.validateAsync(req.body);
    const category = await categoryService.updateCategory(categoryId, data);
    return res.success(category);
  } catch (error) {
    console.error("DocumentCategoryController [category_put] Error:", error);
    return res.serverError(error);
  }
};

exports.categories_get = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.success(categories);
  } catch (error) {
    console.error("DocumentCategoryController [categories_get] Error:", error);
    return res.serverError(error);
  }
};

exports.category_get = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(categoryId);
    return res.success(category);
  } catch (error) {
    console.error("DocumentCategoryController [category_get] Error:", error);
    return res.serverError(error);
  }
};
