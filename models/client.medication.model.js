const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'ClientMedication',
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
      medication_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dosage: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      frequency: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      purpose: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      prescribing_doctor: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      indication: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      refill_due: {
        type: DataTypes.DATEONLY,
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
      tableName: 'client_medications',
      timestamps: true,
      underscored: true,
    }
  );
