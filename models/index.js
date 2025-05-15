const sequelize = require("../config/database");
const User = require("./user.model")(sequelize);
const Client = require("./client.model")(sequelize);
const ClientContact = require("./client.contact.model")(sequelize);
const Note = require("./note.model")(sequelize);

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

// Note associations
Client.hasMany(Note, { foreignKey: "client_id", as: "Notes" });
Note.belongsTo(Client, { foreignKey: "client_id", as: "client" });
User.hasMany(Note, { foreignKey: "user_id", as: "Notes" });
Note.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = {
  sequelize,
  User,
  Client,
  ClientContact,
  Note,
};
