const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientProfessionalContact",
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
      role: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },      
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      tableName: "client_professional_contacts",
      timestamps: true,
      underscored: true,
    }
  ); 