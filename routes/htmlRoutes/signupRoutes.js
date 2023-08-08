// Import the Express router
const router = require('express').Router();

// Import the UserController module
const UserController = require('../../controllers/userController');

// Define a route and associate it with the corresponding controller method

// Route for getting the signup page (HTTP GET request)
router.get('/', UserController.getSignupPage);

// Export the router to be used in other modules
module.exports = router;
