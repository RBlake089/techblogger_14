// Import the Express router
const router = require('express').Router();

// Import the UserController module
const UserController = require('../../controllers/UserController');

// Define a route and associate it with the corresponding controller method

// Route for getting the login page (HTTP GET request)
router.get('/', UserController.getLoginPage);

// Export the router to be used in other modules
module.exports = router;
