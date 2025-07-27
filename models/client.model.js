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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      birth_place: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ssn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      state: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      zip: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      relation: {
        type: DataTypes.TEXT,
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      living_situation: {
        type: DataTypes.ENUM(...Object.values(LIVING_SITUATION)),
        allowNull: true,
      },
      code_status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      advance_directive: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      preferred_hospital: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hospital_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hospital_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pharmacy_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pharmacy_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pharmacy_phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pharmacy_fax: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      race: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_care_plan_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cultural_background: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      education: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      religion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active_religion_location: {
        type: DataTypes.TEXT,
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
      dnr: { type: DataTypes.TEXT, allowNull: true },
      trust: { type: DataTypes.TEXT, allowNull: true },
      lifecare: { type: DataTypes.TEXT, allowNull: true },
      will: { type: DataTypes.TEXT, allowNull: true },
      living_will: { type: DataTypes.TEXT, allowNull: true },
      funeral_arrangements: { type: DataTypes.TEXT, allowNull: true },
      cemetery_plot: { type: DataTypes.TEXT, allowNull: true },
      monthly_income: { type: DataTypes.TEXT, allowNull: true },
      spouse_income: { type: DataTypes.TEXT, allowNull: true },
      savings: { type: DataTypes.TEXT, allowNull: true },
      other_assets: { type: DataTypes.TEXT, allowNull: true },
      financial_problems_description: { type: DataTypes.TEXT, allowNull: true },

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
