const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "StartOfCareChecklist",
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
      // AGESNY INTAKE PAPERWORK
      roi: { type: DataTypes.STRING, allowNull: true, defaultValue: null }, //comma separated list of roi
      // MEDICATION LIST
      // INSURANCE CARD
      // ID OR DRIVER'S LICENSE
      // LEGAL PAPERWORK
      advance_directive: { type: DataTypes.STRING, allowNull: true, defaultValue: null }, //comma separated list of advance directives
      // MEDICAL RECORD REQUEST
      // LONG TERM CARE INSURANCE
      ltc_authorization_form: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
      // CODE STATUS
      code_status_notes: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      // EMERGENCY AND FAMILY CONTACT INFORMATION
      // GET UPCOMING APPOINTMENTS
      appointments_on_calendar: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null },
      // SCHEDULE NEXT VISIT
      // SEND RECAP EMAIL TO PRIMARY POINT OF CONTACT
      recap_email_notes: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    },
    {
      tableName: "start_of_care_checklists",
      timestamps: true,
      underscored: true,
    }
  ); 