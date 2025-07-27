const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "EssentialDocument",
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
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      document_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      in_place: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "essential_documents",
      timestamps: true,
      underscored: true,
    }
  );
