const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "CaregiverInformationSheet",
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
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      // Basic Information
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nickname_preferred_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Schedule Information
      wake_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      sleep_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      breakfast_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      lunch_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      snacks_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      activity_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      nap_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      dinner_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      medication_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      likes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dislikes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      redirection_techniques: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      triggers: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      helpful_information: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      documentation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "caregiver_information_sheet",
      timestamps: true,
      underscored: true,
    }
  );
