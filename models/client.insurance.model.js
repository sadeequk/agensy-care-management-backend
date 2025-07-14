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
        type: DataTypes.STRING, 
        allowNull: true,
      },
      medicare_a: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medicare_b: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medicare_numbers: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      supplement_plan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      policy_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mental_health_coverage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hmo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hmo_policy_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hmo_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      long_term_care_insurance_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      long_term_care_insurance_policy_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      long_term_care_insurance_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "client_insurance",
      timestamps: true,
      underscored: true,
    }
  ); 