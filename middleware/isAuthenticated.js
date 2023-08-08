// Middleware function to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  // Check if the user is logged in (session contains loggedIn property)
  if (req.session.loggedIn) {
    // If authenticated, proceed to the next middleware or route handler
    return next();
  }
  // If not authenticated, redirect to the login page
  return res.redirect('/login');
};

// Export the isAuthenticated middleware to be used in other modules
module.exports = isAuthenticated;
