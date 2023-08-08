// Import required modules for defining the User model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Define the User model by extending the Sequelize Model class
class User extends Model {}

// Initialize the User model with attributes and options
User.init(
  {
    // User ID is an auto-incrementing integer primary key
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    // Username of the user, a required string
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Password of the user, a required string with length validation
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6] // Minimum length of the password
      },
    },
  },
  {
    // Hooks to automatically hash the password before creating or updating
    hooks: {
      // Before creating a new user, hash the password
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before updating a user, hash the password
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Sequelize instance to use for defining the model
    sequelize,
    // Options to configure the model's behavior
    timestamps: false, // Disable timestamps for createdAt and updatedAt
    underscored: true, // Uses snake_case for attribute names
    freezeTableName: true, // Prevents pluralizing the table name
    modelName: 'user', // Model name to use in queries and associations
  }
);

// Export the User model to be used in other modules
module.exports = User;
