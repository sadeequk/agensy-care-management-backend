const { DataTypes } = require("sequelize");
const { THREAD_TYPES, THREAD_SUB_TYPES } = require("../constants");

module.exports = (sequelize) =>
  sequelize.define(
    "Thread",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      primary_user_id: {
        type: DataTypes.UUID,
      },
      started_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_message_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_message_sender_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(THREAD_TYPES)),
      },
      sub_type: {
        type: DataTypes.ENUM(...Object.values(THREAD_SUB_TYPES)),
        defaultValue: THREAD_SUB_TYPES.ONE_TO_ONE,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "threads",
      timestamps: true,
      underscored: true,
    }
  );
