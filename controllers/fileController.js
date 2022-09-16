const db = require('../config/database')
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs');

var accessToken = 'wYbZyddxUTMTIw6rZvXkzKpiDA27fzbR'


exports.createFile = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'
  var folderId = req.body.id

  console.log(folderId);


  var data = new FormData()
  data.append('file', fs.createReadStream('D:/wedig.pdf'))
  data.append('parent.id', `${folderId}`)

  var config = {
    method: 'post',
    url: 'https://upload.box.com/api/2.0/files/content',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      ...data.getHeaders(),
    },
    data: data,
  }

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}

exports.getFileInfo = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'
  var fileId = req.params.id
  const url = `https://api.box.com/2.0/files/${fileID}`

  axios
    .get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then((api_res) => {
      console.log('Success')
      // console.log('resp', res.data)

      return res.status(200).json({
        status_code: 200,
        success: 'Get File information',
        body: api_res.data,
      })
    })
    .catch(function (error) {
      console.log(error)

      return res.status(400).json({
        status_code: error.status,
        error: error.message,
      })
    })
}

exports.copyFile = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'
  var parentFolderId = req.body.id
  //console.log(parentFolderId)
  var folderId = req.params.id

  const url = `https://api.box.com/2.0/files/${parentFolderId}/copy`
  const data = {
    parent: {
      id: folderId,
    },
  }

  axios
    .post(url, data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then((api_res) => {
      console.log('Success')
      // console.log('resp', res.data)
      return res.status(200).json({
        status_code: 200,
        success: 'Copy File',
      })
    })
    .catch(function (error) {
      console.log(error)

      return res.status(400).json({
        status_code: error.status,
        error: error.message,
      })
    })
}

exports.deleteFile = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'

  var fileId = req.params.id
   const url = `https://api.box.com/2.0/files/${fileId}`

  axios
    .delete(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
    })
    .then((api_res) => {
      console.log('Success')
      // console.log('resp', res.data)
      if(!fileId){
        return res.status(200).json({
          success:'This file not exists'
        })
      }else{
        return res.status(200).json({
          status_code: 200,
          success: 'Delete File',
        })
      }
      
    })
    .catch(function (error) {
      console.log(error)

      return res.status(400).json({
        status_code: error.status,
        error: error.message,
      })
    })
}
