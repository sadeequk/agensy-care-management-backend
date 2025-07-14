const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "HealthcareProvider",
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
      provider_type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      specialty: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      fax: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      last_visit: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      next_visit: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specialty_provider: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      follow_up: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      for_what_problem: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "healthcare_providers",
      timestamps: true,
      underscored: true,
    }
  );
