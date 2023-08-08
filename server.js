// Import required modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});
const sequelize = require('./config/connection')
const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');

// Define the port number
const PORT = process.env.PORT || 3001;

// Configure session
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use session middleware
app.use(session(sessionConfig));

// Configure Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes
app.use(routes);

// Determine if Sequelize should force synchronization
const force = process.env.FORCE_SYNC === 'false';

// Sync Sequelize models with the database and start the server
sequelize.sync({
  force
}).then(() => {
  app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`);
  });
});

// Commented out code
// console.log("This is a commented out code section");
