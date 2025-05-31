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
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      cognito_id: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
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
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      last_login: {
        type: DataTypes.DATE,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      relation: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      stripe_customer_id: {
        type: DataTypes.STRING(255),
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
