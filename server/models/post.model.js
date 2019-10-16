const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
        },
        title:
        {
            type: String,
            required: true,
            minlength: 3,
        },
        content:
        {
            type: String,
            required: true,
        },
        image:
        {
            type: String,
            required: true,
        },
        price:
        {
            type: Number,
            required: true,
        },
        date:
        {
            type: Date,
            required: true,
        },
    },
    {
        timestamps:true,
    }
);

const Post = mongoose.model('Post',postSchema);

module.exports = Post;