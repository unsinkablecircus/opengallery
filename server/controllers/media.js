const pg import ('../db/database')
const s3 import ('../s3/s3')

exports.uploadPhoto = function (req, res) {
  uploadToPG()
  uploadToS3()
  updatePGid()
};

uploadToPG = function (req, res, next) {};
uploadToS3 = function (req, res, next) {};
updatePGid = function (req, res, next) {};