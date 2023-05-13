const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

// Get all posts ('/')
router.get('/', async (req, res) => {
    try {
          // Retrieve all posts from db
        const dbPostData = await Post.findAll({ 
            attributes: ['id', 'posttitle', 'description', 'date_created'],           
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commenttext', 'date_created'],
                    // include: {
                    //     model: User,
                    //     attributes: ['username'],
                    // },
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
            order: [['date_created', 'DESC']],
        })
        // Serialize data retrieved
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts)
        // Respond with template to render along with date retrieved
        res.render('homepage', 
            { posts, 
             });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// Get single post ('/post/:id')
router.get('/post/:id', async (req, res) => {
    try{
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'description', 'posttitle', 'date_created'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commenttext',  'date_created'],
                    include: {
                      model: User,
                      attributes: ['username'],
                    },
                  },
                  {
                    model: User,
                    attributes: ['username'],
                  },
            ],
        });
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username, })  
        } else {
            res.status(404).json({ message: "This id has no post."});
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }   
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup
router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router; 