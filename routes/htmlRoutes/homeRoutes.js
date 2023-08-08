// Import the Express router
const router = require('express').Router();

// Import the HomepageController module
const HomepageController = require('../../controllers/HomepageController');

// Define a route and associate it with the corresponding controller method

// Route for getting the homepage (HTTP GET request)
router.get('/', HomepageController.getHomePage);

// Export the router to be used in other modules
module.exports = router;
