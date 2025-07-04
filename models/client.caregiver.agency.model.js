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
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      point_of_contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      caregiver_schedule: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      caregiver_duties: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      important_information: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "caregiver_agency",
      timestamps: true,
      underscored: true,
    }
  );
