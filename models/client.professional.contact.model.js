const { DataTypes } = require("sequelize");
const { PROFESSIONAL_CONTACT_ROLES } = require("../constants");

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
        type: DataTypes.ENUM(...Object.values(PROFESSIONAL_CONTACT_ROLES)),
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
      underscored: true,I
    }
  ); 