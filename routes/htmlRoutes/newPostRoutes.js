// Import the Express router
const router = require('express').Router();

// Import the PostController module
const PostController = require('../../controllers/PostController');

// Define a route and associate it with the corresponding controller method

// Route for getting the new post creation page (HTTP GET request)
router.get('/', PostController.getNewPostPage);

// Export the router to be used in other modules
module.exports = router;
