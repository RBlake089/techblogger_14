// Import the Express router
const router = require('express').Router();

// Import the UserController module
const userController = require('../../controllers/UserController');

// Define routes and associate them with corresponding controller methods

// Route for user login (HTTP GET request)
router.get('/login', userController.login);

// Route for user logout (HTTP GET request)
router.get('/logout', userController.logout);

// Route for user registration (HTTP POST request)
router.post('/register', userController.register);

// Export the router to be used in other modules
module.exports = router;
