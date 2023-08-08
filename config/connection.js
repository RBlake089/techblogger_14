// Importing the Sequelize library to interact with the database
const Sequelize = require('sequelize');

// Loading environment variables from '.env' file if present
require('dotenv').config();

// Declaring a variable to hold the Sequelize instance
let sequelize;

// Checking if a JAWSDB_URL environment variable is available (used for hosting on platforms like Heroku)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is available, create a Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not available, create a Sequelize instance using the local database credentials
  sequelize = new Sequelize(
    process.env.DB_NAME,       // Database name
    process.env.DB_USER,       // Database username
    process.env.DB_PASSWORD,   // Database password
    {
      host: '127.0.0.1',       // Database host (localhost)
      dialect: 'mysql',        // Database dialect (MySQL in this case)
      port: 3306,              // Database port (MySQL default port)
    }
  );
}

// Exporting the Sequelize instance to be used throughout the application
module.exports = sequelize;


