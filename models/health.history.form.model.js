const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "HealthHistoryForm",
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
      description_of_health_concern: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      admitting_diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      onset_of_symptoms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      frequency_of_symptoms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      severity_of_symptoms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      what_worked: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "health_history_forms",
      timestamps: true,
      underscored: true,
    }
  );
