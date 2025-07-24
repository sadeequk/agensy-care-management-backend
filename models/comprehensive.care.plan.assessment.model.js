const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'ComprehensiveCarePlanAssessment',
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      primary_user_id: { type: DataTypes.UUID, allowNull: false },
      client_id: { type: DataTypes.UUID, allowNull: false },
      initial_request: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      care_recipient_goals: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      demographic_and_historic_information: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medical_history: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'comprehensive_care_plan_assessments',
      timestamps: true,
      underscored: true,
    }
  );
