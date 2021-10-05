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
    res.render('new-post');
});

//sends user to login page
router.get('/login', (req, res) => {
    res.render('login')
});

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