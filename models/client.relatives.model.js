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
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      home_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      work_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      relationship: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "client_relatives",
      timestamps: true,
      underscored: true,
    }
  ); 