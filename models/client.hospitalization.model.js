const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientHospitalization",
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
      admitting_diagnosis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      treatment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "client_hospitalizations",
      timestamps: true,
      underscored: true,
    }
  );
