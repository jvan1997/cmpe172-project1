const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const uri = "mongodb+srv://jonathan:root1234@jvancluster-xpjqh.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri,{ useUnifiedTopology: true },{ useNewUrlParser: true }, { useNewUrlParser: true });
  client.connect(err => {
    if(err) throw err;
    const collection = client.db("db1").collection("table1");
    // perform actions on the collection object
    console.log('connect');
    collection.find({},function(error, items) {
      if (error) throw error;
      let listItems = []
      items.forEach(item =>{
        console.log(item);
        listItems.push(item);
      }).finally(function() {     
        return res.status(200).json({
          data:listItems        
        });
      });;
    });
  });
});


module.exports = router;
