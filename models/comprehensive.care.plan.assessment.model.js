const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ComprehensiveCarePlanAssessment",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      primary_user_id: { type: DataTypes.UUID, allowNull: false },
      client_id: { type: DataTypes.UUID, allowNull: false },
      initial_request: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      care_recipient_goals: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      demographic_and_historic_information: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      medical_history: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "comprehensive_care_plan_assessments",
      timestamps: true,
      underscored: true,
    }
  );
