const express = require('express')
//const multer = require(‘multer’);

const {
 
  createFolder,
  getFolderInfo,
  listItemInFolder,
  copyFolder,
  downloadFile,
  updateFolder,
  deleteFolder,
} = require('../controllers/folderController')

const router = express.Router()

router.route('/addfolder').post(createFolder)

router.route('/getfolderinfo/:id').get(getFolderInfo)

router.route('/listitems/:id').get(listItemInFolder)

router.route('/copyfolder/:id').post(copyFolder) //in processing

router.route('/downloadfile/:id').get(downloadFile)

router.route('/updatefolder/:id').put(updateFolder)

router.route('/deletefolder/:id').delete(deleteFolder)

module.exports = router
