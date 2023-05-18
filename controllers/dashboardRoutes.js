const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// User's all posts ('/dashboard')
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      // order: [['created_at', 'DESC']],
      // include: [
      //   {
      //     model: Comment,
      //     include: {
      //       model: User,
      //       attributes: ['name'],
      //     },
      //   },
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render('dashboard', { posts, logged_in: req.session.logged_in, username: req.session.username,});       
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one post to edit ('dashboard/edit/:id')
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        
        include: {
          model: User,
          attributes: ['name'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'This id has no post.' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, logged_in: true, username: req.session.username });         
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//  Get new post ('/dashboard/new)
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { username: req.session.username });
});

module.exports = router; 