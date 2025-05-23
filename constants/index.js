exports.USER_ROLES = {
  PRIMARY_USER: "primary_user",
  FAMILY_MEMBER: "family_member",
  CAREGIVER: "caregiver",
  ADMIN: "admin",
};

exports.COGNITO_GROUPS = {
  PRIMARY_USERS: "PrimaryUsers",
  FAMILY_MEMBERS: "FamilyMembers",
  CAREGIVERS: "Caregivers",
  ADMINS: "Admins",
};

exports.GENDER_TYPES = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

exports.CONTACT_TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  EMERGENCY: "emergency",
};

exports.MARITAL_STATUS = {
  SINGLE: "single",
  MARRIED: "married",
  DIVORCED: "divorced",
  WIDOWED: "widowed",
};

exports.LIVING_SITUATION = {
  INDEPENDENT: "independent",
  ASSISTED: "assisted",
  NURSING: "nursing",
  FAMILY: "family",
};

exports.ALLOWED_FILE_TYPES = {
  "application/pdf": "PDF",
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/gif": "GIF",
};

exports.DOCUMENT_UPLOAD_TYPES = {
  GENERAL: "general",
  CLIENT: "client",
};

module.exports.DOCUMENT_CATEGORIES = {
  MEDICAL_RECORDS: "Medical Records",
  LEGAL_DOCUMENTS: "Legal Documents",
  FINANCIAL_RECORDS: "Financial Records",
  INSURANCE_INFORMATION: "Insurance Information",
  CARE_PLANS: "Care Plans",
  ID_CARDS_VITAL: "ID Cards & Vital Documents",
  NOTES_CORRESPONDENCE: "Notes & Correspondence",
  MISCELLANEOUS: "Miscellaneous/Other",
};
