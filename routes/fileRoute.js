const express = require('express');


const {
    createFile, getFileInfo,copyFile,deleteFile
  } = require('../controllers/fileController')

const router = express.Router();

router.route('/createfile').post(createFile) 

router.route('/getfileinfo/:id').get(getFileInfo);

router.route('/copyfile/:id').post(copyFile);

router.route('/deletefile/:id').delete(deleteFile);

module.exports = router;