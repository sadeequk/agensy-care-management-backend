const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Database connection
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 5432,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Create migrations tracking table
async function createMigrationsTable() {
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ Migrations tracking table ready");
  } catch (error) {
    console.error("Error creating migrations table:", error);
  }
}

// Check if migration was already run
async function isMigrationExecuted(migrationName) {
  const [results] = await sequelize.query("SELECT name FROM migrations WHERE name = ?", {
    replacements: [migrationName],
    type: Sequelize.QueryTypes.SELECT,
  });
  return results.length > 0;
}

// Mark migration as executed
async function markMigrationExecuted(migrationName) {
  await sequelize.query("INSERT INTO migrations (name) VALUES (?)", {
    replacements: [migrationName],
  });
}

// Get all migration files
function getMigrationFiles() {
  const migrationsPath = path.join(__dirname, "migrations");
  if (!fs.existsSync(migrationsPath)) {
    console.log("No migrations folder found");
    return [];
  }

  return fs
    .readdirSync(migrationsPath)
    .filter((file) => file.endsWith(".js"))
    .sort(); // Sort to run in order (001, 002, 003...)
}

// Run all migrations
async function runAllMigrations() {
  try {
    console.log("🚀 Starting Universal Migration Runner...\n");

    // Create migrations tracking table
    await createMigrationsTable();

    // Get all migration files
    const migrationFiles = getMigrationFiles();

    if (migrationFiles.length === 0) {
      console.log("No migration files found in migrations/ folder");
      return;
    }

    console.log(`📁 Found ${migrationFiles.length} migration file(s):`);
    migrationFiles.forEach((file) => console.log(`   - ${file}`));
    console.log("");

    let executedCount = 0;
    let skippedCount = 0;

    for (const migrationFile of migrationFiles) {
      const migrationName = migrationFile;

      // Check if migration was already executed
      const isExecuted = await isMigrationExecuted(migrationName);

      if (!isExecuted) {
        console.log(`🔄 Running migration: ${migrationName}`);

        try {
          // Import and run migration
          const migration = require(path.join(__dirname, "migrations", migrationFile));

          if (migration.up) {
            await migration.up(sequelize.getQueryInterface(), Sequelize);
            await markMigrationExecuted(migrationName);
            console.log(`✅ Migration ${migrationName} completed successfully`);
            executedCount++;
          } else {
            console.log(`⚠️  Migration ${migrationName} has no 'up' function`);
          }
        } catch (error) {
          console.error(`❌ Migration ${migrationName} failed:`, error.message);
          throw error; // Stop execution on error
        }
      } else {
        console.log(`⏭️  Migration ${migrationName} already executed, skipping`);
        skippedCount++;
      }
    }

    console.log("\n📊 Migration Summary:");
    console.log(`   ✅ Executed: ${executedCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    console.log(`   📁 Total: ${migrationFiles.length}`);

    if (executedCount > 0) {
      console.log("\n🎉 All migrations completed successfully!");
    } else {
      console.log("\n✨ All migrations are up to date!");
    }
  } catch (error) {
    console.error("\n💥 Migration process failed:", error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run the migrations
runAllMigrations();
