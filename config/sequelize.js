const { sequelize } = require("../models/index");

const testConnection = async () => {
  try {
    console.log("Attempting to connect to PostgreSQL...");
    console.log("Connection details:", {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
    });

    await sequelize.authenticate();
    console.log("Successfully connected to PostgreSQL database.");
    // await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    // await sequelize.sync({ alter: true }); // Alter sync to add new tables/columns without dropping existing data
    console.log("Database synchronized successfully - existing data preserved.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL database.");
    console.error("Error message:", error.message);
  }
};

module.exports = { sequelize, testConnection };
