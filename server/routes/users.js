var express = require('express');
var router = express.Router();
let User = require('../models/user.model')
/* GET users listing. */
router.route('/').get((req,res) =>{
  User.find().then(user =>res.json(user))
  .catch(err=> res.status(400).json({error:true, message:err}));
});

router.route('/add').post((req,res) =>{
  const username = req.body.username;
  const newUser = new User({username});

  newUser.save().then(
    () => res.json('User Added')
  ).catch(
    err=> res.status(400).json({error:true, message:err})
  );
  
});
module.exports = router;
