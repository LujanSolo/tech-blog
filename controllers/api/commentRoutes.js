const router = require('express').Router();
const { Comment } = require('../../models/comment');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
      date_created: req.body.date_created,
    });

    res.status(200).json(commentData);
    console.log(commentData)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;