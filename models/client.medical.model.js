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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_cognitive_screening: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      cognitive_score: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
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
