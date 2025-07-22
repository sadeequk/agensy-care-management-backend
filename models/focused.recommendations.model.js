const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "FocusedRecommendations",
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
      option_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "focused_recommendations",
      timestamps: true,
      underscored: true,
    }
  ); 