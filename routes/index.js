// Import the Express router
const router = require('express').Router();

// Import the route modules for pages and APIs
const pageroutes = require('./page');
const apiRoutes = require('./api');

// Define routes and delegate to the appropriate route modules

// Route for handling page-related routes
router.use('/', pageroutes);

// Route for handling API-related routes
router.use('/api', apiRoutes);

// Export the router to be used in other modules
module.exports = router;
