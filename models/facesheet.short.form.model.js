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
        type: DataTypes.STRING,
        allowNull: true,
      },
      medicare: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      group_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mpoa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mpoa_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mpoa_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dpoa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dpoa_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dpoa_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "facesheet_short_forms",
      timestamps: true,
      underscored: true,
    }
  );
