const { DataTypes } = require("sequelize");
const { GENDER_TYPES, MARITAL_STATUS, LIVING_SITUATION } = require("../constants/index");

module.exports = (sequelize) =>
  sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      ssn: {
        type: DataTypes.STRING(20),
      },
      address: {
        type: DataTypes.STRING(255),
      },
      city: {
        type: DataTypes.STRING(100),
      },
      state: {
        type: DataTypes.STRING(50),
      },
      zip: {
        type: DataTypes.STRING(20),
      },
      phone: {
        type: DataTypes.STRING(20),
      },
      relation: {
        type: DataTypes.STRING(20),
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(GENDER_TYPES)),
        allowNull: false,
      },
      marital_status: {
        type: DataTypes.ENUM(...Object.values(MARITAL_STATUS)),
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING(50),
      },
      living_situation: {
        type: DataTypes.ENUM(...Object.values(LIVING_SITUATION)),
        allowNull: false,
      },
      code_status: {
        type: DataTypes.STRING(50),
      },
      advance_directive: {
        type: DataTypes.STRING(50),
      },
      preferred_hospital: {
        type: DataTypes.STRING(255),
      },
      hospital_address: {
        type: DataTypes.STRING(255),
      },
      hospital_phone: {
        type: DataTypes.STRING(20),
      },
      pharmacy_name: {
        type: DataTypes.STRING(255),
      },
      pharmacy_address: {
        type: DataTypes.STRING(255),
      },
      pharmacy_phone: {
        type: DataTypes.STRING(20),
      },
      pharmacy_fax: {
        type: DataTypes.STRING(20),
      },
      notes: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "clients",
      timestamps: true,
      underscored: true,
    }
  );
