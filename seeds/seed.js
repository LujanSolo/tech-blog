const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let i = 0

  for (const post of postData) {

    let newPost = await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    //* extracting keynames from an object and creating a new object (by wrapping [])
    await Comment.create({
        ...commentData[i], 
        user_id: users[Math.floor(Math.random() * users.length)].id, 
        post_id: newPost.id
    }),
      i++
  }

  process.exit(0);
};

seedDatabase();