const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const dashRoutes = require('./dashRoutes')

router.use('/', homeRoutes); //* all handlebars (html)
router.use('/api', apiRoutes); //* api routes for crud and get json objects
// router.use('/dashboard', dashRoutes);

module.exports = router;
