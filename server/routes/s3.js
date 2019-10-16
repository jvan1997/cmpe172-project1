var AWS = require('aws-sdk')
const fs = require('fs')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
const BUCKET = 'jvanbucket'
const REGION = 'us-west-1'
const ACCESS_KEY = 'AKIAIWPEYRAJOWQNFYCA'
const SECRET_KEY = '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'

const localImage = '/yunpreset1.png'
const imageRemoteName = `yunImage_${new Date().getTime()}.png`

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
})

var s3 = new AWS.S3()

s3.putObject({
  Bucket: BUCKET,
  Body: fs.readFileSync(__dirname +localImage),
  Key: imageRemoteName
})
  .promise()
  .then(response => {
    console.log(`done! - `, response)
    res.send(
      `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })}`
    )
  })
  .catch(err => {
    console.log('failed:', err)
  })
});

module.exports = router;

