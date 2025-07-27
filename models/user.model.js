const { DataTypes } = require("sequelize");
const { USER_ROLES, SUBSCRIPTION_STATUS } = require("../constants/index");

module.exports = (sequelize) =>
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        required: false,
        defaultValue: null,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      cognito_id: {
        type: DataTypes.TEXT,
        unique: true,
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.TEXT,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(USER_ROLES)),
        allowNull: false,
        defaultValue: USER_ROLES.PRIMARY_USER,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
      },
      socket_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      relation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stripe_customer_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      subscription_status: {
        type: DataTypes.ENUM(...Object.values(SUBSCRIPTION_STATUS)),
        defaultValue: SUBSCRIPTION_STATUS.INACTIVE,
      },
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );
