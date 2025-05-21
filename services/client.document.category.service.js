const { DocumentCategory } = require("../models");

exports.createCategory = (categoryData) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await DocumentCategory.create(categoryData);
      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [createCategory] Error:", error);
      reject(error);
    }
  });

exports.updateCategory = (categoryId, categoryData, client_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await DocumentCategory.findOne({
        where: {
          id: categoryId,
          client_id: client_id,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }

      await category.update(categoryData);
      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [updateCategory] Error:", error);
      reject(error);
    }
  });

exports.getAllCategories = (client_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const categories = await DocumentCategory.findAll({
        where: {
          client_id: client_id,
        },
      });
      resolve(categories);
    } catch (error) {
      console.error("DocumentCategoryService [getAllCategories] Error:", error);
      reject(error);
    }
  });

exports.getCategoryById = (categoryId, client_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await DocumentCategory.findOne({
        where: {
          id: categoryId,
          client_id: client_id,
        },
      });

      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [getCategoryById] Error:", error);
      reject(error);
    }
  });
