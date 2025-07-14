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
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      relation: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(GENDER_TYPES)),
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.ENUM(...Object.values(MARITAL_STATUS)),
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      living_situation: {
        type: DataTypes.ENUM(...Object.values(LIVING_SITUATION)),
        allowNull: true,
      },
      code_status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      advance_directive: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      preferred_hospital: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hospital_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hospital_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      pharmacy_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pharmacy_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      pharmacy_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      pharmacy_fax: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      race: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      last_care_plan_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      cultural_background: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      education: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      religion: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      active_religion_location: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      date_of_divorce_or_widowhood: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      loss_impact_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
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
