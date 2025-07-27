const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientCaregiverAgency",
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
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      point_of_contact: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      caregiver_schedule: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      caregiver_duties: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      important_information: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "caregiver_agency",
      timestamps: true,
      underscored: true,
    }
  );
