const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User} = require('../models');

//sends user to home page and loads all posts
router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

//sends user to new-post page
router.get('/new-post', (req, res) => {
    res.render('new-post', {
        loggedIn: req.session.loggedIn
    });
});

//sends user to login page
router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/:city', (req, res) => { 
  Post.findAll({ 
    where: {
        city: req.params.city
    },
    include: {
        model: User, 
        attributes: {
            include: ['username'],
            exclude: ['password']
        }
    }
})
.then(dbPostData => {
    //serialize data 
    const posts = dbPostData.map(post => post.get({ plain: true }));
    //send data to template
    res.render('city-reviews', {
      posts,
      loggedIn: req.session.loggedIn
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})



//logs out a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  
});



module.exports = router