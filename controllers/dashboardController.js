// Importing necessary models
const Post = require('../models/post');
const User = require('../models/user');

// Exporting an object containing controller functions
module.exports = {
  // Controller function for rendering the main dashboard page
  getDashboardPage: (req, res) => {
    // Rendering the 'dashboard' view with the loggedIn and user_id properties
    // extracted from the session and passed to the view template
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  },

  // Controller function for rendering the dashboard of a specific user
  getUserDashboard: (req, res) => {
    // Extracting the user_id from the session
    const user_id = req.session.user_id;

    // Finding a user by their primary key (ID) with associated posts using the 'include' option
    User.findByPk(req.params.user_id, { include: [Post] }) 
      .then(userData => {
        // If no user is found with the given ID, send a 500 (Internal Server Error) response with a JSON message
        if (!userData) {
          res.status(500).json({ message: 'No user found with this id!' });
          return;
        }

        // Extracting and mapping the posts data of the user into plain JavaScript objects
        const userPosts = userData.posts.map(post => post.get({ plain: true }));

        // Rendering the 'dashboard' view for the specific user, passing the userPosts,
        // loggedIn, and user_id properties from the session to the view template
        res.render('dashboard', {
          userPosts,
          loggedIn: req.session.loggedIn,
          user_id: req.session.user_id,
        });
      })
      .catch(err => {
        // If any error occurs during execution, send a 500 (Internal Server Error) response with the error message
        res.status(500).json(err);
      });
  },
};
