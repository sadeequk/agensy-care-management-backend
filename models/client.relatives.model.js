const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientRelatives",
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
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      home_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      work_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      relationship: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "client_relatives",
      timestamps: true,
      underscored: true,
    }
  );
