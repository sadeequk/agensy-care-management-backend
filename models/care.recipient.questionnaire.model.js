const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "CareRecipientQuestionnaire",
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


      //TODO: Remaining fields will be added here
    },
    {
      tableName: "care_recipient_questionnaire",
      timestamps: true,
      underscored: true,
    }
  ); 