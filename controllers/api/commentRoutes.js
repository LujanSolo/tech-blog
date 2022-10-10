const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      date_created: req.body.date_created,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});