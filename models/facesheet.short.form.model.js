const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "FaceSheetShortForm",
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
      insurance: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      medicare: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      group_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_number: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mpoa: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mpoa_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mpoa_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dpoa: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dpoa_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dpoa_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "facesheet_short_forms",
      timestamps: true,
      underscored: true,
    }
  );
