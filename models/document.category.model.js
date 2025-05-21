const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "DocumentCategory",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      default_access_level: {
        type: DataTypes.STRING(50),
        defaultValue: "limited",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "document_categories",
      timestamps: true,
      underscored: true,
    }
  );
