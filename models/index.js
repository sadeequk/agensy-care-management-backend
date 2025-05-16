const sequelize = require("../config/database");
const User = require("./user.model")(sequelize);
const Client = require("./client.model")(sequelize);
const ClientContact = require("./client.contact.model")(sequelize);
const ClientNote = require("./note.model")(sequelize);

//^ User to User Relation (One-To-Many)
User.hasMany(User, { foreignKey: "primary_user_id", as: "subUsers" }); //sub users for a parent user
User.belongsTo(User, { foreignKey: "primary_user_id", as: "primaryUser" }); //parent user for sub users

//^ User to Client Relation (Many-To-Many)
User.belongsToMany(Client, { through: "UserClients" });
Client.belongsToMany(User, { through: "UserClients" });

//^ Client to ClientContact Relation (One-To-Many)
Client.hasMany(ClientContact, { foreignKey: "client_id", as: "contacts", onDelete: "CASCADE" });
ClientContact.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^  Client to ClientNotes Relation (One-To-Many)
Client.hasMany(ClientNote, { foreignKey: "client_id", as: "clientNotes", onDelete: "CASCADE" });
ClientNote.belongsTo(Client, { foreignKey: "client_id", as: "client" });

module.exports = {
  sequelize,
  User,
  Client,
  ClientContact,
  ClientNote,
};
