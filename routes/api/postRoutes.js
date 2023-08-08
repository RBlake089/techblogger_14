// Import the Express router
const router = require('express').Router();

// Import the PostController module
const PostController = require('../../controllers/PostController');

// Define routes and associate them with corresponding controller methods

// Route for creating a new post (HTTP POST request)
router.post('/', PostController.createPost);

// Route for updating a single post (HTTP PUT request)
// :post_id is a URL parameter representing the ID of the post to be updated
router.put('/:post_id', PostController.updateSinglePost);

// Route for deleting a single post (HTTP DELETE request)
// :post_id is a URL parameter representing the ID of the post to be deleted
router.delete('/:post_id', PostController.deleteSinglePost);

// Export the router to be used in other modules
module.exports = router;
