// Import the Express router
const router = require('express').Router();

// Import the PostController module
const PostController = require('../../controllers/postController');

// Define routes and associate them with corresponding controller methods

// Route for getting a single post by its ID (HTTP GET request)
// :post_id is a URL parameter representing the ID of the post to retrieve
router.get('/:post_id', PostController.getSinglePost);

// Route for getting comments of a single post by its ID (HTTP GET request)
// :post_id is a URL parameter representing the ID of the post whose comments are requested
router.get('/:post_id/comments', PostController.getSinglePostComment);

// Route for getting a page to delete or update a single post by its ID (HTTP GET request)
// :post_id is a URL parameter representing the ID of the post to delete or update
router.get('/:post_id/deleteUpdate', PostController.getSinglePostDeleteUpdate);

// Export the router to be used in other modules
module.exports = router;
