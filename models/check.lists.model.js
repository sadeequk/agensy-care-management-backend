const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Checklists",
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
      checklist_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checklist_data: {
          type: DataTypes.JSONB,
          allowNull: true,
          defaultValue: null,
        }
      },
    {
      tableName: "checklists",
      timestamps: true,
      underscored: true,
    }
  ); 