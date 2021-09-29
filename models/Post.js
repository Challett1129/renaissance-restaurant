const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        //id of post
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //post title
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        user_id : {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize, 
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;

