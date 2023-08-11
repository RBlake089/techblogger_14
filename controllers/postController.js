// Importing the required models
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

// Exporting an object containing various methods to handle different routes

module.exports = {
  // Method to render the create-new-post page
  getNewPostPage: (req, res) => {
    res.render('createNewPost', {
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    });
  },

  // Method to create a new post
  createPost: (req, res) => {
    const {
      body: { title, description },
      session: { user_id }
    } = req;

    Post.create({
      title,
      description,
      user_id
    })
    .then(postData => {
      res.status(200).json(postData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  },

  // Method to render the single-post-form page along with the specific post data
  getSinglePost: (req, res) => {
    Post.findByPk(req.params.post_id, {
      include: [User, Comment]
    })
    .then(postData => {
      const post = postData.get({ plain: true });
      res.render('singlePostForm', {
        post,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
      console.log(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  },

  // ... Other methods ...

  // Method to update an existing post
  updateSinglePost: (req, res) => {
    const {
      body: { title, description },
      session: { user_id }
    } = req;

    Post.update(
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
    )
    .then(postData => {
      if (!postData[0]) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      res.status(200).json(postData);
      console.log('>>>>>> Post Data' + postData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    });
  },

  // Method to delete a post
  deleteSinglePost: (req, res) => {
    Post.destroy(
      {
        where: {
          post_id: req.params.post_id,
        },
      }
    )
    .then(postDelete => {
      console.log(req.params);
      res.json(postDelete);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  }
};
