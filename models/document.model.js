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
      uploaded_by: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      document_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      s3_bucket: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      file_url: {
        type: DataTypes.STRING(2048),
        allowNull: true,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING(100),
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
