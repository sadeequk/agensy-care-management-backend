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
  "image/jpg": "JPEG",
  "image/png": "PNG",
  "image/heic": "HEIC",
  "image/heif": "HEIF",
  "image/heic-sequence": "HEIC",
  "image/heif-sequence": "HEIF",
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

module.exports.APPOINTMENT_TYPES = {
  REGULAR_CHECKUP: "regular checkup",
  DENTAL: "dental",
  THERAPHY: "therapy",
  LABORATORY: "laboratory",
  VISION: "vision",
  OTHER: "other",
};

exports.ALLOWED_AVATAR_TYPES = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/gif": "GIF",
  "image/webp": "WEBP",
};

exports.SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  CANCELED: "canceled",
};

exports.THREAD_TYPES = {
  GENERAL: "general",
  CLIENT: "client",
};

exports.THREAD_SUB_TYPES = {
  ONE_TO_ONE: "one-to-one",
  GROUP: "group",
};

exports.VACCINATION_TYPES = {
  FLU: "Flu",
  COVID: "COVID",
  TD_BOOSTER: "TD Booster",
  SHINGLES_VACCINE_1ST: "Shingles Vaccine (1st)",
  SHINGLES_VACCINE_2ND: "Shingles Vaccine (2nd)",
  PNEUMONIA: "Pneumonia",
  MMR: "MMR",
  MENINGOCOCCAL: "Meningococcal",
  CHICKEN_POX: "Chicken Pox",
  HEPATITIS_A: "Hepatitis A",
  HEPATITIS_B: "Hepatitis B",
};

exports.FORM_TYPES = { 
  FACE_SHEET_SHORT: "face_sheet_short",
  FACE_SHEET_LONG: "face_sheet_long",
  HEALTH_HISTORY: "health_history",
  CARE_RECIPIENT_QUESTIONNAIRE: "care_recipient_questionnaire",
  ESSENTIAL_DOCUMENT: "essential_document",
  CAREGIVER_INFORMATION_SHEET: "caregiver_information_sheet",
  MEDICAL_TEMPLATE: "medical_template",
  INITIAL_CARE_PLAN_ASSESSMENT: "initial_care_plan_assessment",
  //checklists 
  START_OF_CARE: "start_of_care",
  CARE_PLAN: "care_plan",
  HOSPITALIZATION: "hospitalization", 
  MOVE_IN: "move_in",
  NEXT_STEP_AFTER_DEATH: "next_step_after_death",
};


//validating checklist
exports.CHECKLIST_TYPES = {
  START_OF_CARE: "start_of_care",
  CARE_PLAN: "care_plan",
  HOSPITALIZATION: "hospitalization", 
  MOVE_IN: "move_in",
  NEXT_STEP_AFTER_DEATH: "next_step_after_death",
}


exports.CARE_PLAN_CATEGORIES = {
  FUNCTIONAL_ADLS: "functional_adls",
  FUNCTIONAL_IADLS: "functional_iadls",
  HOME_SAFETY: "home_safety",
  MEMORY_REASONING: "memory_reasoning",
  GERIATRIC_DEPRESSION: "geriatric_depression",
  NUTRITIONAL_HEALTH: "nutritional_health",
  LEGAL_FINANCIAL: "legal_financial",
  CARE_GIVER_SUPPORT: "care_giver_support",
};