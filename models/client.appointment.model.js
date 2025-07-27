const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Appointment",
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
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      healthcare_provider_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      appointment_type: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      post_appointment_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reminder_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "appointments",
      timestamps: true,
      underscored: true,
    }
  );
