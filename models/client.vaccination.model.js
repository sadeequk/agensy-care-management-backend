const { DataTypes } = require("sequelize");
const { VACCINATION_TYPES } = require("../constants");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientVaccination",
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
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      next_vaccine: {
        // type: DataTypes.DATEONLY,
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "vaccinations",
      timestamps: true,
      underscored: true,
    }
  );
