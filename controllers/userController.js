// Importing the required model and bcrypt library
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Exporting an object containing various methods to handle different routes related to user authentication

module.exports = {
  // Method to render the signup page
  getSignupPage: (req, res) => {
    res.render('signup');
  },

  // Method to render the login page
  getLoginPage: (req, res) => {
    res.render('login');
  },

  // Method to create a new user (user registration)
  register: (req, res) => {
    const {
      body: { username, password },
    } = req;

    User.create(req.body)
      .then(user => {
        delete user.password;

        req.session.save()
          .then(() => {
            req.session.loggedIn = true;
            req.session.username = user.username;
            req.session.user_id = user.user_id;
            res.status(200).json(user);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Method to handle user login
  login: (req, res) => {
    const {
      body: { username, password },
    } = req;

    User.findOne({ where: { username } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password)
          .then(pwMatch => {
            if (!pwMatch) {
              return res.status(401).json({ message: 'Invalid credentials' });
            }

            req.session.loggedIn = true;
            req.session.username = user.username;
            req.session.user_id = user.user_id;
            req.session.save()
              .then(() => {
                res.status(200).json({
                  user: username,
                  user_id: req.session.user_id,
                  loggedIn: req.session.loggedIn,
                  message: 'You are now logged in!',
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Method to handle user logout
  logout: (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy()
        .then(() => {
          res.status(204).end();
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    } else {
      res.status(404).end();
    }
  },
};
