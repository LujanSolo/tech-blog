const sequelize = require('../config/connection');
const { User, Comment, Note } = require('../models');

const userData = require('./userData.json');
const noteData = require('./notesData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let i = 0

  for (const note of noteData) {

    let newNote = await Note.create({
      ...note,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    //* extracting keynames from an object and creating a new object (by wrapping [])
    await Comment.create({
        ...commentData[i], 
        user_id: users[Math.floor(Math.random() * users.length)].id, 
        note_id: newNote.id
    }),
      i++
  }

  process.exit(0);
};

seedDatabase();