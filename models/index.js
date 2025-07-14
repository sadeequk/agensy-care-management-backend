const sequelize = require("../config/database");
const User = require("./user.model")(sequelize);
const Client = require("./client.model")(sequelize);
const ClientContact = require("./client.contact.model")(sequelize);
const ClientNote = require("./note.model")(sequelize);
const ClientMedication = require("./client.medication.model")(sequelize);
const HealthcareProvider = require("./client.healthcare.provider.model")(sequelize);
const ClientMedical = require("./client.medical.model")(sequelize);
const Document = require("./client.document.model")(sequelize);
const ClientAppointment = require("./client.appointment.model")(sequelize);
const Thread = require("./thread.model")(sequelize);
const Message = require("./message.model")(sequelize);
const FaceSheetShortForm = require("./facesheet.short.form.model")(sequelize);
const ClientVaccination = require("./client.vaccination.model")(sequelize);
const ClientHomeHealthAgency = require("./client.home.health.agency.model")(sequelize);
const ClientBloodwork = require("./client.bloodwork.model")(sequelize);
const ClientCaregiverAgency = require("./client.caregiver.agency.model")(sequelize);
const ClientMedicationCondition = require("./client.medical.condition")(sequelize);
const ClientHospitalization = require("./client.hospitalization.model")(sequelize);
const HealthHistoryForm = require("./health.history.form.model")(sequelize);
const CareRecipientQuestionnaire = require("./care.recipient.questionnaire.model")(sequelize);
const ClientInsurance = require("./client.insurance.model")(sequelize);
const FormsHistory = require("./forms.history.model")(sequelize);
const ClientRelatives= require("./client.relatives.model")(sequelize);
const ClientFriendContact = require("./client.friend.contact.model")(sequelize);
const ClientProfessionalContact = require("./client.professional.contact.model")(sequelize);

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
Document.belongsTo(User, { foreignKey: "primary_user_id", as: "primaryUser" });

//^ Appointment to User Relation (Many-To-One)
ClientAppointment.belongsTo(User, { foreignKey: "created_by", as: "createdBy" });
User.hasMany(ClientAppointment, { foreignKey: "created_by", as: "createdAppointments" });

//^ Appointment to Client Relation (Many-To-One)
ClientAppointment.belongsTo(Client, { foreignKey: "client_id", as: "client" });
Client.hasMany(ClientAppointment, { foreignKey: "client_id", as: "appointments", onDelete: "CASCADE" });

//^ Appointment to HealthcareProvider Relation (Many-To-One)
ClientAppointment.belongsTo(HealthcareProvider, {
  foreignKey: "healthcare_provider_id",
  as: "healthCareProvider",
  onDelete: "SET NULL",
});
HealthcareProvider.hasMany(ClientAppointment, {
  foreignKey: "healthcare_provider_id",
  as: "appointments",
});

//^ Thread-User (Many-to-Many)
Thread.belongsToMany(User, {
  through: "threadParticipants",
  foreignKey: "thread_id",
  as: "participants",
});
//^ User-Thread
User.belongsToMany(Thread, {
  through: "threadParticipants",
  foreignKey: "user_id",
  as: "threads",
});

//^ Thread-Message (One-to-Many)
Thread.hasMany(Message, {
  foreignKey: "thread_id",
  as: "messages",
});

//^Message-Thread
Message.belongsTo(Thread, {
  foreignKey: "thread_id",
  as: "thread",
});

//^ Message-User (Many-To-One)
Message.belongsTo(User, {
  foreignKey: "sender_id",
  as: "sender",
});

//^ Thread-Creator
Thread.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});

//^ Thread-PrimaryUser
Thread.belongsTo(User, {
  foreignKey: "primary_user_id",
  as: "primaryUser",
});

//^ Thread-Client
Thread.belongsTo(Client, {
  foreignKey: "client_id",
  as: "client",
});

//^ Client to FaceSheetShortForm Relation (One-To-One)
Client.hasOne(FaceSheetShortForm, { foreignKey: "client_id", as: "facesheetShortForm", onDelete: "CASCADE" });
FaceSheetShortForm.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to ClientVaccination Relation (One-To-Many)
Client.hasMany(ClientVaccination, { foreignKey: "client_id", as: "vaccinations", onDelete: "CASCADE" });
ClientVaccination.belongsTo(Client, { foreignKey: "client_id", onDelete: "CASCADE" });

//^ Client to ClientBloodwork Relation (One-To-Many)
Client.hasMany(ClientBloodwork, { foreignKey: "client_id", as: "bloodworks", onDelete: "CASCADE" });
ClientBloodwork.belongsTo(Client, { foreignKey: "client_id", onDelete: "CASCADE" });

//^ Client to ClientCaregiverAgency Relation (One-To-One)
Client.hasOne(ClientCaregiverAgency, { foreignKey: "client_id", as: "caregiver_agency", onDelete: "CASCADE" });
ClientCaregiverAgency.belongsTo(Client, { foreignKey: "client_id", onDelete: "CASCADE" });

//^ Client to ClientHomeHealthAgency Relation (One-To-One)
Client.hasOne(ClientHomeHealthAgency, { foreignKey: "client_id", as: "home_health_agency", onDelete: "CASCADE" });
ClientHomeHealthAgency.belongsTo(Client, { foreignKey: "client_id", onDelete: "CASCADE" });

//^ Client to ClientMedicationCondition Relation (One-To-Many)
Client.hasMany(ClientMedicationCondition, { foreignKey: "client_id", as: "medicationConditions", onDelete: "CASCADE" });
ClientMedicationCondition.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to ClientHospitalization Relation (One-To-One)
Client.hasOne(ClientHospitalization, { foreignKey: "client_id", as: "hospitalization", onDelete: "CASCADE" });
ClientHospitalization.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to HealthHistoryForm Relation (One-To-One)
Client.hasOne(HealthHistoryForm, { foreignKey: "client_id", as: "health_history_form", onDelete: "CASCADE" });
HealthHistoryForm.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to FormsHistory Relation (One-To-Many)
Client.hasMany(FormsHistory, { foreignKey: "client_id", as: "formsHistory", onDelete: "CASCADE" });
FormsHistory.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ User to FormsHistory Relation (One-To-Many)
User.hasMany(FormsHistory, { foreignKey: "user_id", as: "formsHistory", onDelete: "CASCADE" });
FormsHistory.belongsTo(User, { foreignKey: "user_id", as: "user" });

//^ Client to CareRecipientQuestionnaire Relation (One-To-One)
Client.hasOne(CareRecipientQuestionnaire, { foreignKey: "client_id", as: "care_recipient_questionnaire", onDelete: "CASCADE" });
CareRecipientQuestionnaire.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to ClientInsurance Relation (One-To-One)
Client.hasOne(ClientInsurance, { foreignKey: "client_id", as: "insurance", onDelete: "CASCADE" });
ClientInsurance.belongsTo(Client, { foreignKey: "client_id", as: "client" });

// ^ Client to ClientRelative Relation (One-To-Many)
Client.hasMany(ClientRelatives, { foreignKey: "client_id", as: "relatives", onDelete: "CASCADE" });
ClientRelatives.belongsTo(Client, { foreignKey: "client_id", as: "client" });

// //^ Client to ClientHelper Relation (One-To-Many)
// Client.hasMany(ClientHelper, { foreignKey: "client_id", as: "helpers", onDelete: "CASCADE" });
// ClientHelper.belongsTo(Client, { foreignKey: "client_id", as: "client" });

// //^ Client to ClientProfessionalContact Relation (One-To-Many)
Client.hasMany(ClientProfessionalContact, { foreignKey: "client_id", as: "professionalContacts", onDelete: "CASCADE" });
ClientProfessionalContact.belongsTo(Client, { foreignKey: "client_id", as: "client" });

//^ Client to ClientFriendContact Relation (One-To-Many)
Client.hasMany(ClientFriendContact, { foreignKey: "client_id", as: "friendContacts", onDelete: "CASCADE" });
ClientFriendContact.belongsTo(Client, { foreignKey: "client_id", as: "client" });

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
  ClientAppointment,
  Thread,
  Message,
  FaceSheetShortForm,
  ClientVaccination,
  ClientHomeHealthAgency,
  ClientBloodwork,
  ClientCaregiverAgency,
  ClientMedicationCondition,
  ClientHospitalization,
  HealthHistoryForm,
  CareRecipientQuestionnaire,
  ClientInsurance,
  FormsHistory,
  ClientRelatives,
  ClientFriendContact,
  ClientProfessionalContact,
};
