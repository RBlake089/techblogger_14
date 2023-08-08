// Import the Express router
const router = require('express').Router();

// Import the DashboardController module
const DashboardController = require('../../controllers/DashboardController');

// Define routes and associate them with corresponding controller methods

// Route for getting the main dashboard page (HTTP GET request)
router.get('/', DashboardController.getDashboardPage);

// Route for getting a user-specific dashboard (HTTP GET request)
// :user_id is a URL parameter representing the ID of the user for whom the dashboard is requested
router.get('/:user_id', DashboardController.getUserDashboard);

// Export the router to be used in other modules
module.exports = router;
