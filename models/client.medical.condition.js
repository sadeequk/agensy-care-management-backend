const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "ClientMedicationCondition",
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
      condition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      onset_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      problem:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      treatment:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      medications:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "medication_conditions",
      timestamps: true,
      underscored: true,
    }
  );
