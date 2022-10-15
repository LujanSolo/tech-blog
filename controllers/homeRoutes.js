const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET route to Homepage and find all blogposts, then render them to the homepage
//* route = http:localhost:3001/
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }))

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to render dashboard page with all of the logged in user's posts
//* route = http:localhost:3001/dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }))

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Route to homepage posts tagged with a unique ID
//* route = http:localhost:3001/comments/:id (e.g. //* route = http:localhost:3001/comments/1)
router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('publicpost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//  GET all blogposts that belong to a specific user withAuth middleware to prevent access to route
//* route = http:localhost:3001/posts
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('userpost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET to render Login route
//* route = http:localhost:3001/login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET route to render signup page
//* route = http:localhost:3001/signup
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// GET route to render the Newpost page
//* route = http:localhost:3001/newpost
router.get('/newpost', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  //! Don't need this here, as it only goes on the dashboard (logged in) page
  //* so, what goes here instead? 
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('newpost');
});



module.exports = router;