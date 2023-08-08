// Import the User, Post, and Comment models
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Define associations between models using Sequelize methods

// A user can have multiple posts (one-to-many)
User.hasMany(Post, {
  foreignKey: 'user_id', // Reference user_id in Post model
  onDelete: 'CASCADE', // If user is deleted, delete associated posts
});

// A post belongs to a user (many-to-one)
Post.belongsTo(User, {
  foreignKey: 'user_id', // Reference user_id in Post model
  onDelete: 'CASCADE', // If user is deleted, delete associated posts
});

// A post can have multiple comments (one-to-many)
Post.hasMany(Comment, {
  foreignKey: 'post_id', // Reference post_id in Comment model
  onDelete: 'CASCADE', // If post is deleted, delete associated comments
});

// A comment belongs to a post (many-to-one)
Comment.belongsTo(Post, {
  foreignKey: 'post_id', // Reference post_id in Comment model
  onDelete: 'CASCADE', // If post is deleted, delete associated comments
});

// A user can have multiple comments (one-to-many)
User.hasMany(Comment, {
  foreignKey: 'user_id', // Reference user_id in Comment model
  onDelete: 'CASCADE', // If user is deleted, delete associated comments
});

// A comment belongs to a user (many-to-one)
Comment.belongsTo(User, {
  foreignKey: 'user_id', // Reference user_id in Comment model
  onDelete: 'CASCADE', // If user is deleted, delete associated comments
});

// Export the models and associations to be used in other modules
module.exports = {
  User,
  Post,
  Comment,
};
