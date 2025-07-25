const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientMedical",
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
      diagnoses: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      allergies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dietary_restrictions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      surgical_history: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cognitive_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_cognitive_screening: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      test_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cognitive_score: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      last_checkup_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      
      // Vitals
      height: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blood_pressure: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      temperature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      heart_rate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      additional_vitals: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      recent_hospitalization: { type: DataTypes.BOOLEAN, allowNull: true },
      hospital_details: { type: DataTypes.STRING, allowNull: true },
      support_system_thoughts: { type: DataTypes.STRING, allowNull: true },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "client_medical",
      timestamps: true,
      underscored: true,
    }
  );
