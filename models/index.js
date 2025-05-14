const sequelize = require("../config/database");
const User = require("./user.model")(sequelize);
const Client = require("./client.model")(sequelize);
const ClientContact = require("./client.contact.model")(sequelize);

User.hasMany(Client, { foreignKey: "primary_user_id" });
Client.belongsTo(User, { foreignKey: "primary_user_id" });

Client.hasMany(ClientContact, {
  foreignKey: "client_id",
  as: "ClientContacts",
});
ClientContact.belongsTo(Client, {
  foreignKey: "client_id",
  as: "client",
});

module.exports = {
  sequelize,
  User,
  Client,
  ClientContact,
};
