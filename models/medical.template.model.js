const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "MedicalTemplate",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      // Visit Details
      reason_for_visit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      top_3_concerns: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tests_labs_imaging: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      visit_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recommendations: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referrals: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      follow_up: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      report_given_to: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "medical_templates",
      timestamps: true,
      underscored: true,
    }
  ); 