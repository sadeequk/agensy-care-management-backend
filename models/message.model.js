const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      thread_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      read_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "messages",
      timestamps: true,
      underscored: false,
    }
  );
