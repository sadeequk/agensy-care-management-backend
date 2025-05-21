const categoryService = require("../services/document.category.service");
const joiSchemas = require("../validation/document.category.schemas");

exports.category_post = async (req, res) => {
  try {
    const data = await joiSchemas.category_post.validateAsync(req.body);
    const primary_user_id = req.user.id;
    const category = await categoryService.createCategory({ ...data, primary_user_id });
    return res.success(category);
  } catch (error) {
    console.error("DocumentCategoryController [category_post] Error:", error);
    if (error.message === "Only primary users can manage document categories") {
      return res.fail(error.message);
    }
    return res.serverError(error);
  }
};

exports.category_put = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const data = await joiSchemas.category_put.validateAsync(req.body);
    const primary_user_id = req.user.id;
    const category = await categoryService.updateCategory(categoryId, data, primary_user_id);
    return res.success(category);
  } catch (error) {
    console.error("DocumentCategoryController [category_put] Error:", error);
    if (error.message === "Only primary users can manage document categories") {
      return res.fail(error.message);
    }
    return res.serverError(error);
  }
};

exports.categories_get = async (req, res) => {
  try {
    const primary_user_id = req.user.id;
    const categories = await categoryService.getAllCategories(primary_user_id);
    return res.success(categories);
  } catch (error) {
    console.error("DocumentCategoryController [categories_get] Error:", error);
    if (error.message === "Only primary users can manage document categories") {
      return res.fail(error.message);
    }
    return res.serverError(error);
  }
};

exports.category_get = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const primary_user_id = req.user.id;
    const category = await categoryService.getCategoryById(categoryId, primary_user_id);
    return res.success(category);
  } catch (error) {
    console.error("DocumentCategoryController [category_get] Error:", error);
    if (error.message === "Only primary users can manage document categories") {
      return res.fail(error.message);
    }
    return res.serverError(error);
  }
};
