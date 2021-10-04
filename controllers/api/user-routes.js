const router = require('express').Router();
const sequelize = require('../../config/connection.js');
const { Post, User } = require('../../models');

//get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
        include: {
            model: Post
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

//get a single user by their id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        } 
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

//create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password 
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

//update an existing user
router.put('/:id', (req, res) => {
    // expects {username: 'user_username', email: 'this@email.com', password: 'anypassword1234'}
  
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//delete a user by their id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

module.exports = router;
