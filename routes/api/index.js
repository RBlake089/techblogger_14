// Import the Express router
const router = require('express').Router();

// Import the necessary controllers and middleware
const PostController = require('../../controllers/postController');
const UserController = require('../../controllers/userController');
const CommentController = require('../../controllers/commentController');
const isAuthenticated = require('../../middleware/isAuthenticated');

// Import additional route modules
const postRoutes = require('./postRoutes');

// Define routes and associate them with corresponding controller methods

// Registration route
router.use('/register', UserController.register);

// Login route
router.use('/login', UserController.login);

// Logout route (requires authentication)
router.use('/logout', isAuthenticated, UserController.logout);

// Create post route
router.use('/createPost', PostController.createPost);

// Get single post route
router.use('/singlePost', PostController.getSinglePost);

// Create comment route
router.use('/createComment', CommentController.createComment);

// Update and delete routes (delegated to postRoutes module)
router.use('/update', postRoutes);
router.use('/delete', postRoutes);

// Export the router to be used in other modules
module.exports = router;
