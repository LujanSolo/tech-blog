const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// localhost:3001/api/posts
router.post('/', withAuth, async (req, res) => {
  try {
    const newPostData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/posts/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update(
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
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id', withAuth, async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const post = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/posts/:id', withAuth, async (req,res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });
    
    if (!postData) {
      res.status(404).json({ message: 'No post found with this ID.' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;