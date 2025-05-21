const { DocumentCategory, User } = require("../models");
const { USER_ROLES } = require("../constants/index");

const checkPrimaryUserRole = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user || user.role !== USER_ROLES.PRIMARY_USER) {
    throw new Error("Only primary users can manage document categories");
  }
  return user;
};

exports.createCategory = (categoryData) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPrimaryUserRole(categoryData.primary_user_id);
      const category = await DocumentCategory.create(categoryData);
      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [createCategory] Error:", error);
      reject(error);
    }
  });

exports.updateCategory = (categoryId, categoryData, primary_user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPrimaryUserRole(primary_user_id);
      const category = await DocumentCategory.findOne({
        where: {
          id: categoryId,
          primary_user_id: primary_user_id,
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

exports.getAllCategories = (primary_user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPrimaryUserRole(primary_user_id);
      const categories = await DocumentCategory.findAll({
        where: {
          primary_user_id: primary_user_id,
        },
      });
      resolve(categories);
    } catch (error) {
      console.error("DocumentCategoryService [getAllCategories] Error:", error);
      reject(error);
    }
  });

exports.getCategoryById = (categoryId, primary_user_id) =>
  new Promise(async (resolve, reject) => {
    try {
      await checkPrimaryUserRole(primary_user_id);
      const category = await DocumentCategory.findOne({
        where: {
          id: categoryId,
          primary_user_id: primary_user_id,
        },
      });

      resolve(category);
    } catch (error) {
      console.error("DocumentCategoryService [getCategoryById] Error:", error);
      reject(error);
    }
  });
