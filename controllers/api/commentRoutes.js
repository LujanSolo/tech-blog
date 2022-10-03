const router = require('express').Router();
const { Note } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      note_id: req.session.note_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const commentData = await Note.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id, //! Should this be user_id or note_id ??
//       },
//     });

//     if (!noteData) {
//       res.status(404).json({ message: 'No note found with this id!' });
//       return;
//     }

//     res.status(200).json(noteData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;