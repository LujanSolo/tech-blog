const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      date_created: req.body.date_created,
    });

    res.status(200).json(newBlogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blog = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req,res) => {
  try {
    const blogData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });
    
    if (!blogData) {
      res.status(404).json({ message: 'No post found with this ID.' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;