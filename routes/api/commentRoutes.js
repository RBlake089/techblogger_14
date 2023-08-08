// Import the Express router
const router = require('express').Router();

// Import the CommentController module
const CommentController = require('../../controllers/CommentController');

// Define a route for handling POST requests to create comments
router.post('/', CommentController.createComment);

// Export the router to be used in other modules
module.exports = router;
