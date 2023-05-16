const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

const userData = require('./userData');
const blogData = require('./blogData');
const commentData = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

 
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const seedData = () => Post.bulkCreate(blogData)
  for (const blog of blogData) {
    await Post.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
