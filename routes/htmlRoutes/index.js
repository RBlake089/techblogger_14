// Import the Express router
const router = require('express').Router();

// Import the various route modules
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const loginRoutes = require('./loginPageRoutes');
const signupRoutes = require('./signupRoutes');
const newPostRoutes = require('./newPostRoutes');
const singlePostRoutes = require('./singlePostRoutes');

// Define routes and delegate to the appropriate route modules

// Route for handling home-related routes
router.use('/', homeRoutes);

// Route for handling dashboard-related routes
router.use('/dashboard', dashboardRoutes);

// Route for handling login-related routes
router.use('/login', loginRoutes);

// Route for handling signup-related routes
router.use('/signup', signupRoutes);

// Route for handling new post creation-related routes
router.use('/createNewPost', newPostRoutes);

// Route for handling single post-related routes
router.use('/getSinglePost', singlePostRoutes);

// Export the router to be used in other modules
module.exports = router;
