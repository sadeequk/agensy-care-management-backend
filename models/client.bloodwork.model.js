const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientBloodwork",
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
      results: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ordered_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      repeat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "bloodworks",
      timestamps: true,
      underscored: true,
    }
  );
