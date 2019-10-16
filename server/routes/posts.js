var express = require('express');
var router = express.Router();
let Post = require('../models/post.model')
/* GET users listing. */
router.route('/').get((req,res) =>{
  Post.find().then(post =>res.json(post))
  .catch(err=> res.status(400).json({error:true, message:err}));
});

router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const title  = req.body.title;
    const content = req.body.content;
    const image = req.body.image;
    const price = Number(req.body.price);
    const date = Date(req.body.date);
    const newPost = new Post({
        username,
        title,
        content,
        image,
        price,
        date
    })
  newPost.save().then(
    () => res.json('Post Added')
  ).catch(
    err=> res.status(400).json({error:true, message:err})
  );
  
});

router.route('/:id').get((req,res) =>{
    Post.findById(req.params.id)
    .then(post =>res.json(post))
    .catch(err => res.status(400).json({error:true,message:err}));
});
router.route('/:id').delete((req,res) =>{
    Post.findByIdAndDelete(req.params.id)
    .then(() =>res.status(200).json({error:false,message:"Deleted Post"}))
    .catch(err => res.status(400).json({error:true,message:err}));
});
router.route('update/:id').post((req,res) =>{
    Post.findById(req.params.id)
    .then(post => {
        post.username = req.body.username,
        post.title = req.body.title,
        post.content = req.body.content,
        post.image = req.body.image,
        post.price = Number(req.body.price),
        post.date = Date(req.body.date)

        post.save()
        .then(()=>res.status(200).json({error:false,message:"Updated post"}))
        .catch(err => res.status(400).json({error:true,message:err}))
    })
    .catch(err => res.status(400).json({error:true,message:err}));
});

module.exports = router;
