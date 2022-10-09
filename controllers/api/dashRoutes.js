const router = require('express').Router();
const { Note, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/dashboard', withAuth,async (req, res) => {
  try {
    // Get all notes and JOIN with user data
    const notesData = await Note.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const notes = notesData.map((note) => note.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      notes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update by Id



// delete by id

module.exports = router;