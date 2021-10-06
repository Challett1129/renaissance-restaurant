//import dependencies 
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: User, 
            attributes: {
                include: ['username'],
                exclude: ['password']
            }
        }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.json(500).json(err);
    });
});

//get post by city
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
        if(!dbPostData) {
            res.status(404).json({ message: 'No reviews in this city found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }, 
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post with this id found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//create a new post
router.post('/', (req, res) => {
    //example {title: 'Bob's Burgers', text_body:'This place is awesome! The burger of the day was great, but the child that served it to me asked me if I'd be willing to buy ambegris from her', city: 'New Jersey'}
    Post.create({
        title: req.body.title,
        text_body: req.body.text_body,
        city: req.body.city,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update a post
router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//destroy a post by it's id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;