var AWS = require('aws-sdk')
const fs = require('fs')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
const BUCKET = 'jvanbucket';
const REGION = 'us-west-1';
const ACCESS_KEY = 'AKIAI45ICTX2OM3YAUGA';
const SECRET_KEY = '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';
  try{
      AWS.config.setPromisesDependency();
      AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
        region: REGION
      });
      var s3 = new AWS.S3();
      s3.listObjectsV2({
        Bucket: BUCKET
      },function (err, data) {
        //handle error
        if (err) {
          console.log("Error", err);
        }
        //success
        if (data) {
          console.log("Uploaded in:", data);
        }});

      }
  catch(e){
      console.log("our error" + e);
  }
});

module.exports = router;
