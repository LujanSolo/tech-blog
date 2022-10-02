const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes); //* all handlebars (html)
router.use('/api', apiRoutes); //* api routes for crud and get json objects

module.exports = router;
