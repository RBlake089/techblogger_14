// Import the required modules
const Comment = require('../models/comment');
const session = require('express-session');

// Export the function as a module
module.exports = {
  // Function to create a new comment
  createComment: (req, res) => {
    // Extract data from the request body and session
    const description = req.body.description;
    const post_id = req.body.post_id;
    const user_id = req.session.user_id;
    const username = req.session.username;

    // Create a new comment using the Comment model
    Comment.create({
      description: description,
      user_id: user_id,
      post_id: post_id,
      username: username,
    })
      .then(commentData => {
        // Log the created comment data and send a response
        console.log(commentData);
        res.status(200).json(commentData);
      })
      .catch(err => {
        // If an error occurs, send a 500 status and the error message as a response
        res.status(500).json(err);
      });
  },
};
