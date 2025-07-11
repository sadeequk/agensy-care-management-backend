const { DataTypes } = require("sequelize");
const { FORM_TYPES } = require("../constants");

module.exports = (sequelize) =>
  sequelize.define(
    "FormsHistory",
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      form_type: {
        type: DataTypes.ENUM(Object.values(FORM_TYPES)),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "forms_history",
      timestamps: true,
      underscored: true,
    }
  ); 