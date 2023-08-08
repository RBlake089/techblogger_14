// Import required modules for defining the Post model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model by extending the Sequelize Model class
class Post extends Model {}

// Initialize the Post model with attributes and options
Post.init(
  {
    // Post ID is an auto-incrementing integer primary key
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    // Title of the post, a required string
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Description of the post, a required string
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Foreign key referencing the associated user's ID
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the 'user' model
        key: 'user_id', // The referenced column in the 'user' model
      },
    },
  },
  {
    // Sequelize instance to use for defining the model
    sequelize,
    // Options to configure the model's behavior
    freezeTableName: true, // Prevents pluralizing the table name
    underscored: true, // Uses snake_case for attribute names
    modelName: 'post', // Model name to use in queries and associations
  }
);

// Export the Post model to be used in other modules
module.exports = Post;
