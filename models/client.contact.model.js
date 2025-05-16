const { DataTypes } = require("sequelize");
const { CONTACT_TYPES } = require("../constants/index");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientContact",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.UUID,
      },
      contact_type: {
        type: DataTypes.ENUM(...Object.values(CONTACT_TYPES)),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      relationship: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(20),
      },
      email: {
        type: DataTypes.STRING(255),
      },
      address: {
        type: DataTypes.STRING(255),
      },
      notes: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "client_contacts",
      timestamps: true,
      underscored: true,
    }
  );
