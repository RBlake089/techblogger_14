// Import required modules for defining the Comment model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model by extending the Sequelize Model class
class Comment extends Model {}

// Initialize the Comment model with attributes and options
Comment.init(
  {
    // Comment ID is an auto-incrementing integer primary key
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    // Description of the comment, a required string
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Foreign key referencing the associated post's ID
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // References the 'post' model
        key: 'post_id', // The referenced column in the 'post' model
      },
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
    modelName: 'comment', // Model name to use in queries and associations
  }
);

// Export the Comment model to be used in other modules
module.exports = Comment;
