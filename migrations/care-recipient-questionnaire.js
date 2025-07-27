const sequelize = require("../config/sequelize");
const { QueryTypes } = require("sequelize");

const tableName = "care_recipient_questionnaire";

const runMigration = async () => {
  try {
    const result = await sequelize.query(`SELECT to_regclass(:table) AS exists;`, {
      replacements: { table: tableName },
      type: QueryTypes.SELECT,
    });

    const exists = result[0].exists !== null;

    if (!exists) {
      console.log("Table does not exist. Creating full table...");
      await sequelize.query(`
        CREATE TABLE care_recipient_questionnaire (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          client_id UUID NOT NULL,
          primary_user_id UUID NOT NULL,
          support_system_rating TEXT,
          support_system_problems TEXT,
          emergency_contacts TEXT,
          house_cleaning_agency TEXT,
          house_cleaning_satisfaction TEXT,
          house_cleaning_frequency TEXT,
          home_aid_agency TEXT,
          home_aid_satisfaction TEXT,
          home_aid_frequency TEXT,
          home_health_agency TEXT,
          home_health_satisfaction TEXT,
          home_health_frequency TEXT,
          maintenance_agency TEXT,
          maintenance_satisfaction TEXT,
          maintenance_frequency TEXT,
          other_help_agency TEXT,
          other_help_satisfaction TEXT,
          other_help_frequency TEXT,
          living_environment_type TEXT,
          home_environment_adequacy TEXT,
          problem_areas_daily_living TEXT,
          problem_areas_explanation TEXT,
          problems_risks TEXT,
          nutrition_concerns TEXT,
          self_care_capacity_summary TEXT,
          memory_problems TEXT,
          emotional_health_notes TEXT,
          personality_coping TEXT,
          recent_behavior_changes TEXT,
          recipient_shares_concerns BOOLEAN,
          recipient_shares_concerns_notes TEXT,
          emotional_problems_history BOOLEAN,
          emotional_problems_treatment BOOLEAN,
          emotional_problems_notes TEXT,
          recent_losses_impact TEXT,
          social_life_notes TEXT,
          occupation_profession TEXT,
          retirement_date DATE,
          retirement_adjustment TEXT,
          major_concerns TEXT,
          areas_accepting_help TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);
    } else {
      console.log("Table exists. Updating columns");
      await sequelize.query(`
        ALTER TABLE care_recipient_questionnaire
        ALTER COLUMN "support_system_rating" TYPE TEXT,
        ALTER COLUMN "support_system_problems" TYPE TEXT,
        ALTER COLUMN "emergency_contacts" TYPE TEXT,
        ALTER COLUMN "house_cleaning_agency" TYPE TEXT,
        ALTER COLUMN "house_cleaning_satisfaction" TYPE TEXT,
        ALTER COLUMN "house_cleaning_frequency" TYPE TEXT,
        ALTER COLUMN "home_aid_agency" TYPE TEXT,
        ALTER COLUMN "home_aid_satisfaction" TYPE TEXT,
        ALTER COLUMN "home_aid_frequency" TYPE TEXT,
        ALTER COLUMN "home_health_agency" TYPE TEXT,
        ALTER COLUMN "home_health_satisfaction" TYPE TEXT,
        ALTER COLUMN "home_health_frequency" TYPE TEXT,
        ALTER COLUMN "maintenance_agency" TYPE TEXT,
        ALTER COLUMN "maintenance_satisfaction" TYPE TEXT,
        ALTER COLUMN "maintenance_frequency" TYPE TEXT,
        ALTER COLUMN "other_help_agency" TYPE TEXT,
        ALTER COLUMN "other_help_satisfaction" TYPE TEXT,
        ALTER COLUMN "other_help_frequency" TYPE TEXT,
        ALTER COLUMN "living_environment_type" TYPE TEXT,
        ALTER COLUMN "home_environment_adequacy" TYPE TEXT,
        ALTER COLUMN "problem_areas_daily_living" TYPE TEXT,
        ALTER COLUMN "problem_areas_explanation" TYPE TEXT,
        ALTER COLUMN "problems_risks" TYPE TEXT,
        ALTER COLUMN "nutrition_concerns" TYPE TEXT,
        ALTER COLUMN "self_care_capacity_summary" TYPE TEXT,
        ALTER COLUMN "memory_problems" TYPE TEXT,
        ALTER COLUMN "emotional_health_notes" TYPE TEXT,
        ALTER COLUMN "personality_coping" TYPE TEXT,
        ALTER COLUMN "recent_behavior_changes" TYPE TEXT,
        ALTER COLUMN "recipient_shares_concerns_notes" TYPE TEXT,
        ALTER COLUMN "emotional_problems_notes" TYPE TEXT,
        ALTER COLUMN "recent_losses_impact" TYPE TEXT,
        ALTER COLUMN "social_life_notes" TYPE TEXT,
        ALTER COLUMN "occupation_profession" TYPE TEXT,
        ALTER COLUMN "retirement_adjustment" TYPE TEXT,
        ALTER COLUMN "major_concerns" TYPE TEXT,
        ALTER COLUMN "areas_accepting_help" TYPE TEXT;
      `);
    }

    console.log("Migration completed.");
    await sequelize.close();
  } catch (err) {
    console.error("Migration failed:", err.message);
  }
};

runMigration();
