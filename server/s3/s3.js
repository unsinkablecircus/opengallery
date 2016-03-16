/* Example of connecting to 'opengallery' S3 bucket and executing methods
More details here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
*/
var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});
/*
var params = {
  Bucket: 'opengallery', // required 
  Key: 'TEST_KEY', // required
  ACL: 'public-read',
  Body: 'TEST_BODY'
};
*/
s3.putObject(params, function(err, data) {
  if (err) {
    console.log("Error uploading data: ", err);
    next(err);
  } else {
    console.log("Successfully uploaded data to myBucket/myKey: ", data);
    next(data);
  }
}, next);

module.exports = s3;
