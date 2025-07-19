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
        type: DataTypes.STRING,
        allowNull: true,
      },
      admitting_diagnosis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      treatment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      onset_of_symptoms: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      frequency_of_symptoms: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      severity_of_symptoms: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      what_worked: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "health_history_forms",
      timestamps: true,
      underscored: true,
    }
  );
