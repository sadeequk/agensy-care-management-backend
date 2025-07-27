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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      provider_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specialty: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fax: {
        type: DataTypes.TEXT,
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      for_what_problem: {
        type: DataTypes.TEXT,
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
