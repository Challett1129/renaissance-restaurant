// Import models
const Post = require('./Post');
const User = require('./User');


// Create associations

//User has many posts through their id
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Post belongs to user through foreignKey user_id
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { Post, User }