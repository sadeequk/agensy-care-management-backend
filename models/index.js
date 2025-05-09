const sequelize = require("../config/database");
const User = require("./user.model")(sequelize);
const Client = require("./client.model")(sequelize);

User.hasMany(Client, { foreignKey: "primary_user_id" });
Client.belongsTo(User, { foreignKey: "primary_user_id" });

module.exports = {
  sequelize,
  User,
  Client,
};
