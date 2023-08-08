// Importing the necessary models (User and Post) from the '../models' directory
const { User, Post } = require('../models');

// Exporting an object containing the 'getHomePage' method
module.exports = {
   // 'getHomePage' method to handle the homepage request
   getHomePage: async (req, res) => {
      try {
         // Retrieving all the Post records from the database, including associated User records
         const postData = await Post.findAll({
            include: [User] // 'include' option is used to specify associations to be eager-loaded
         });

         // Converting the retrieved data into plain JavaScript objects (removing extra metadata)
         const posts = postData.map((post) => post.get({
            plain: true
         }));

         // Rendering the 'homepage' view template and passing data to it
         res.render('homepage', {
            // Passing a flag 'loggedIn' to the template indicating if the user is logged in (from session)
            loggedIn: req.session.loggedIn,
            
            // Passing the 'user_id' from the session to the template
            user_id: req.session.user_id,
            
            // Passing the retrieved 'posts' data to the template
            posts
         });
      } catch (err) {
         // If there is an error during database query or rendering the template, send a 500 status with the error details
         res.status(500).json(err);
      }
   }
};








