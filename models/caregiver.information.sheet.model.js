const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'CaregiverInformationSheet',
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      nickname_preferred_name: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      dislikes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      redirection_techniques: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      triggers: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      helpful_information: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      documentation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'caregiver_information_sheet',
      timestamps: true,
      underscored: true,
    }
  );
