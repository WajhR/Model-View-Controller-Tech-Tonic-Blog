const router = require('express').Router();

const userRoutes = require('./user_routes');
const postRoutes = require('./post_routes');
const commentRoutes = require('./comment_routes');

// setup routes
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;