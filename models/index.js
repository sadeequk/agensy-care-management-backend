const sequelize = require("../config/database");
const User = require("./user.model")(sequelize);
const Client = require("./client.model")(sequelize);
const ClientContact = require("./client.contact.model")(sequelize);
const ClientNote = require("./note.model")(sequelize);
const ClientMedication = require("./client.medication.model")(sequelize);
const HealthcareProvider = require("./client.healthcare.provider.model")(sequelize);
const ClientMedical = require("./client.medical.model")(sequelize);
const Document = require("./client.document.model")(sequelize);

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

//^ Client to ClientMedication Relation (One-To-Many)
Client.hasMany(ClientMedication, { foreignKey: "client_id", as: "medications", onDelete: "CASCADE" });
ClientMedication.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to HealthcareProvider Relation (One-To-Many)
Client.hasMany(HealthcareProvider, { foreignKey: "client_id", as: "healthcareProviders", onDelete: "CASCADE" });
HealthcareProvider.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to ClientMedical Relation (One-To-One)
Client.hasOne(ClientMedical, { foreignKey: "client_id", as: "medical", onDelete: "CASCADE" });
ClientMedical.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to Document Relation (One-To-Many)
Client.hasMany(Document, { foreignKey: "client_id", as: "documents", onDelete: "CASCADE" });
Document.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Document to User Relation (One-To-One)      # general (used in "document service" for populating user data who upload the document )
Document.belongsTo(User, { foreignKey: "uploaded_by", as: "uploadedBy" });

module.exports = {
  sequelize,
  User,
  Client,
  ClientContact,
  ClientNote,
  ClientMedication,
  HealthcareProvider,
  ClientMedical,
  Document,
};
