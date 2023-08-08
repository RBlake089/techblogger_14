// Importing the required model and bcrypt library
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Exporting an object containing various methods to handle different routes related to user authentication

module.exports = {
  // Method to render the signup page
  getSignupPage: async (req, res) => {
    res.render('signup');
  },

  // Method to render the login page
  getLoginPage: async (req, res) => {
    res.render('login');
  },

  // Method to create a new user (user registration)
  register: async (req, res) => {
    const {
      body: { username, password },
    } = req;
    try {
      // Creating a new user record in the database with the provided credentials
      const user = await User.create(req.body);

      // Removing the password from the user object (for security) before saving it in the session
      delete user.password;

      // Saving the user details in the session and marking the user as logged in
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = user.username;
        req.session.user_id = user.user_id;
        res.status(200).json(user);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Method to handle user login
  login: async (req, res) => {
    const {
      body: { username, password },
    } = req;
    try {
      // Checking if the provided username exists in the database
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Comparing the provided password with the stored hashed password using bcrypt
      const pwMatch = await bcrypt.compare(password, user.password);
      if (!pwMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Saving the user details in the session and marking the user as logged in
      req.session.loggedIn = true;
      req.session.username = user.username;
      req.session.user_id = user.user_id;
      await req.session.save();

      // Sending a response indicating successful login
      res.status(200).json({
        user: username,
        user_id: req.session.user_id,
        loggedIn: req.session.loggedIn,
        message: 'You are now logged in!',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Method to handle user logout
  logout: (req, res) => {
    // Destroying the user's session when logging out
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      // If the user is not logged in, respond with a 404 status
      res.status(404).end();
    }
  },
};
