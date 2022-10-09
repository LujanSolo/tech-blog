const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');
const commentRoutes = require('./commentRoutes');
const dashboardRoutes = require('./dashRoutes');
const newUserRoutes = require('./newUserRoutes')

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/comments', commentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/signup', newUserRoutes);

module.exports = router;