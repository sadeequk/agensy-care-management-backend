const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientFriendContact",
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
      relationship: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      help_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "client_friend_contacts",
      timestamps: true,
      underscored: true,
    }
  ); 