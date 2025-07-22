// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) =>
//   sequelize.define(
//     "ComprehensiveCarePlanAssessment",
//     {
//       id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//       primary_user_id: { type: DataTypes.UUID, allowNull: false },
//       client_id: { type: DataTypes.UUID, allowNull: false },
      
//       // Assessment Details
      
//       // Additional Comprehensive Fields
//       assessment_summary: { type: DataTypes.TEXT, allowNull: true },
//       care_plan_recommendations: { type: DataTypes.TEXT, allowNull: true },
//       risk_factors: { type: DataTypes.TEXT, allowNull: true },
//       interventions_planned: { type: DataTypes.TEXT, allowNull: true },
//       expected_outcomes: { type: DataTypes.TEXT, allowNull: true },
//       review_date: { type: DataTypes.DATEONLY, allowNull: true },
//     },
//     {
//      tableName: "comprehensive_care_plan_assessments", 
//     timestamps: true, 
//     underscored: true
//  }
//   ); 