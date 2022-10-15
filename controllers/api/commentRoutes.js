const router = require('express').Router();
const { Comment } = require('../../models/comment');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      date_created: req.body.date_created,
    });

    res.status(200).json(commentData);
    console.log(commentData)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;