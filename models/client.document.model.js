const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Document",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      uploaded_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      upload_type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "documents",
      timestamps: true,
      underscored: true,
    }
  );
