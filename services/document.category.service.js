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

exports.updateCategory = (categoryId, categoryData) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await DocumentCategory.findByPk(categoryId);
      await category.update(categoryData);
      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [updateCategory] Error:", error);
      reject(error);
    }
  });

exports.getAllCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const categories = await DocumentCategory.findAll({ where: { active: true } });
      resolve(categories);
    } catch (error) {
      console.error("DocumentCategoryService [getAllCategories] Error:", error);
      reject(error);
    }
  });

exports.getCategoryById = (categoryId) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await DocumentCategory.findByPk(categoryId);
      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [getCategoryById] Error:", error);
      reject(error);
    }
  });
