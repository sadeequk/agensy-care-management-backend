const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientInsurance",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      insurance_type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      medicare_a: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      medicare_b: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      medicare_numbers: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      supplement_plan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      provider: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      policy_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mental_health_coverage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hmo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hmo_policy_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hmo_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      long_term_care_insurance_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      long_term_care_insurance_policy_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      long_term_care_insurance_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "client_insurance",
      timestamps: true,
      underscored: true,
    }
  );
