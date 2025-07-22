const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "InitialCarePlanAssessment",
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
      date_of_assessment: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      date_of_care_plan: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      person_completing_assessment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      present_for_assessment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      goals_for_assessment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
     
     next_step_care_recipient:{
        type: DataTypes.STRING,
        allowNull: true,
     },
     next_step_care_partner:{
        type: DataTypes.STRING,
        allowNull: true,
     },

    },
    {
      tableName: "initial_care_plan_assessments",
      timestamps: true,
      underscored: true,
    }
  ); 