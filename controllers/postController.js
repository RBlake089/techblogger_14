// Importing the required models
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

// Exporting an object containing various methods to handle different routes

module.exports = {
  // Method to render the create-new-post page
  getNewPostPage: async (req, res) => {
    res.render('create-new-post', {
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    });
  },

  // Method to create a new post
  createPost: async (req, res) => {
    const {
      body: { title, description },
      session: { user_id }
    } = req;
    try {
      const postData = await Post.create({
        title,
        description,
        user_id
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Method to render the single-post-form page along with the specific post data
  getSinglePost: async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.post_id, {
        include: [User, Comment]
      });
      const post = postData.get({ plain: true });
      res.render('single-post-form', {
        post,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
      console.log(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Method to render the single-post-no-form page along with the specific post data and associated comments
  getSinglePostComment: async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.post_id, {
        include: [User]
      });
      const post = postData.get({ plain: true });
      const commentData = await Comment.findAll({
        where: { post_id: req.params.post_id },
        include: [User, Post]
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      res.render('single-post-no-form', {
        post,
        comments,
        username: req.session.username,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Method to render the single-post-delete-update page along with the specific post data for editing or deleting
  getSinglePostDeleteUpdate: async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.post_id, {
        include: [User]
      });
      const post = postData.get({ plain: true });
      res.render('single-post-delete-update', {
        post,
        username: req.session.username,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
      console.log(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Method to update an existing post
  updateSinglePost: async (req, res) => {
    const {
      body: { title, description },
      session: { user_id }
    } = req;
    try {
      const postData = await Post.update(
        {
          title,
          description,
          user_id
        },
        {
          where: {
            post_id: req.params.post_id,
          },
        }
      );
      if (!postData[0]) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      res.status(200).json(postData);
      console.log('>>>>>> Post Data' + postData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  },

  // Method to delete a post
  deleteSinglePost: async (req, res) => {
    try {
      const postDelete = await Post.destroy(
        {
          where: {
            post_id: req.params.post_id,
          },
        }
      );
      console.log(req.params);
      res.json(postDelete);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
