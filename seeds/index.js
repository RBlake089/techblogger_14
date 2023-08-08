const sequelize = require('../config/connection');
const{ Post, User, Comment } = require('../models');


const postSeeds = require('./postSeeds.json');
const userSeeds = require('./userSeeds.json');
const commentSeeds = require('./commentSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await User.bulkCreate(userSeeds);
  console.log('\n----- USERS SEEDED -----\n');

  await Post.bulkCreate(postSeeds);
  console.log('\n----- POSTS SEEDED -----\n');

  await Comment.bulkCreate(commentSeeds);
  console.log('\n----- COMMENTS SEEDED -----\n');



  process.exit(0);
};

seedDatabase();