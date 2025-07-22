const { DataTypes } = require("sequelize");
const { CARE_PLAN_CATEGORIES } = require("../constants");
module.exports = (sequelize) =>
  sequelize.define(
    "CarePlanCategory",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      primary_user_id: { type: DataTypes.UUID, allowNull: false },
      client_id: { type: DataTypes.UUID, allowNull: false },
      category_name: { 
        type: DataTypes.STRING,
        values: Object.values(CARE_PLAN_CATEGORIES),
        allowNull: false 
      },
      deficits_noted: { type: DataTypes.BOOLEAN, defaultValue: false },
      summary: { type: DataTypes.TEXT, allowNull: true },
      detailed_table: { type: DataTypes.JSON, allowNull: true },
      additional_data: { type: DataTypes.JSON, allowNull: true },
    },
    { tableName: "care_plan_categories", timestamps: true, underscored: true }
  ); 