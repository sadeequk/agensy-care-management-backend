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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      relationship: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
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
