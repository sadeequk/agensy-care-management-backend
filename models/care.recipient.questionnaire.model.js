const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "CareRecipientQuestionnaire",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      primary_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      // Support System Section
      support_system_rating: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      support_system_problems: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emergency_contacts: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // In-Home Help Section
      house_cleaning_agency: { type: DataTypes.STRING, allowNull: true },
      house_cleaning_satisfaction: { type: DataTypes.STRING, allowNull: true },
      house_cleaning_frequency: { type: DataTypes.STRING, allowNull: true },

      home_aid_agency: { type: DataTypes.STRING, allowNull: true },
      home_aid_satisfaction:{ type: DataTypes.STRING, allowNull: true },
      home_aid_frequency:{ type: DataTypes.STRING, allowNull: true },

      home_health_agency: { type: DataTypes.STRING, allowNull: true },
      home_health_satisfaction: { type: DataTypes.STRING, allowNull: true },
      home_health_frequency:{ type: DataTypes.STRING, allowNull: true },

      maintenance_agency: { type: DataTypes.STRING, allowNull: true },
      maintenance_satisfaction: { type: DataTypes.STRING, allowNull: true },
      maintenance_frequency: { type: DataTypes.STRING, allowNull: true },

      other_help_agency: { type: DataTypes.STRING, allowNull: true },
      other_help_satisfaction: { type: DataTypes.STRING, allowNull: true },
      other_help_frequency:{ type: DataTypes.STRING, allowNull: true },

      // Living Environment
      living_environment_type: { type: DataTypes.STRING, allowNull: true },
      home_environment_adequacy: { type: DataTypes.STRING, allowNull: true },

      // Recent Hospitalization
      recent_hospitalization: { type: DataTypes.BOOLEAN, allowNull: true },
      hospital_details: { type: DataTypes.STRING, allowNull: true },
      
      // Support System Thoughts
      support_system_thoughts: { type: DataTypes.STRING, allowNull: true },

      // Self-care and Daily Living
      problem_areas_daily_living: { type: DataTypes.STRING, allowNull: true },
      problem_areas_explanation: { type: DataTypes.STRING, allowNull: true },

      // Problems/Risks
      problems_risks: { type: DataTypes.STRING, allowNull: true },
      nutrition_concerns: { type: DataTypes.STRING, allowNull: true },
      self_care_capacity_summary: { type: DataTypes.STRING, allowNull: true },

      // Memory, Orientation, and Judgment
      memory_problems: { type: DataTypes.STRING, allowNull: true },
  

      // Emotional Health
      emotional_health_notes: { type: DataTypes.STRING, allowNull: true },
      personality_coping: { type: DataTypes.STRING, allowNull: true },
      recent_behavior_changes: { type: DataTypes.STRING, allowNull: true },
      recipient_shares_concerns: { type: DataTypes.BOOLEAN, allowNull: true },
      recipient_shares_concerns_notes: { type: DataTypes.STRING, allowNull: true },

      // Emotional Problems History
      emotional_problems_history: { type: DataTypes.BOOLEAN, allowNull: true },
      emotional_problems_treatment: { type: DataTypes.BOOLEAN, allowNull: true },
      emotional_problems_notes: { type: DataTypes.STRING, allowNull: true },
      recent_losses_impact: { type: DataTypes.STRING, allowNull: true },

      // Social Life
      social_life_notes: { type: DataTypes.STRING, allowNull: true },

      // Work and Retirement
      occupation_profession: { type: DataTypes.STRING, allowNull: true },
      retirement_date: { type: DataTypes.DATE, allowNull: true },
      retirement_adjustment: { type: DataTypes.STRING, allowNull: true },

      // Summary
      major_concerns: { type: DataTypes.STRING, allowNull: true },
      areas_accepting_help: { type: DataTypes.STRING, allowNull: true },


      //TODO: Remaining fields will be added here
    },
    {
      tableName: "care_recipient_questionnaire",
      timestamps: true,
      underscored: true,
    }
  ); 