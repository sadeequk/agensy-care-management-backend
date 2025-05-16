const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Note",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "notes",
      timestamps: true,
      underscored: true,
    }
  );
