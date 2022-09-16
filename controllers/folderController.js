const db = require('../config/database')
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
//const FormData = require('form-data')


var accessToken= 'wYbZyddxUTMTIw6rZvXkzKpiDA27fzbR'


exports.createFolder = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'
  var folderId = req.body.folderId
  console.log(folderId)
  var Name = req.body.name

  const url = 'https://api.box.com/2.0/folders'
  const data = {
    name: Name,
    parent: {
      id: folderId
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
        success: 'Folder Created',
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


exports.getFolderInfo = async (req, res,id) => {
  //var accessToken = 'Om5MY0p6p0oHouDXOHqzTmmHSsJH8qaw'
  var folderId = req.params.id
  console.log(folderId)
  

  const url = `https://api.box.com/2.0/folders/${folderId}`
  const data = {
      id: folderId
  }
console.log(data)
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
        success: 'Get information',
        body: api_res.data

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


exports.listItemInFolder = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'
  var folderId = req.params.id
  console.log(folderId)
  

  const url = `https://api.box.com/2.0/folders/${folderId}/items`
  const data = {
      id: folderId
  }
console.log(data)
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
        success: 'List information',
        body: api_res.data

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


exports.copyFolder = async (req, res) => {
  //var accessToken = 'Om5MY0p6p0oHouDXOHqzTmmHSsJH8qaw'
  var parentFolderId = req.body.id
  //var Name = req.body.name
  //console.log(parentFolderId)
  var folderId = req.params.id
//console.log(folderId)
  const url = `https://api.box.com/2.0/folders/${parentFolderId}/copy`
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
        success: 'Copied Folder',
       
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


exports.downloadFile = async (req, res) => {
  //var accessToken = '6oV7JoAgKdkdFfqcvACH4WYBvVl3ZWI0'
  var fileId=req.params.id
  console.log(fileId)

  
  const url = `https://api.box.com/2.0/files/${fileId}/content`

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
        success: 'Download file successfully',
        body: api_res.data

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


exports.updateFolder = async (req, res) => {
  //var accessToken = 'CelswmfGwr4XfO32Y34sssBRmoZ9S2Xr'
  var folderId = req.params.id
  var Name = req.body.name
  console.log(folderId)

  const url = `https://api.box.com/2.0/folders/${folderId}`
  const data = {
    name: Name,
  }
  axios
    .put(url, data, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'content-type': 'application/json'
      },
    })
    .then((api_res) => {
      console.log('Success')
      // console.log('resp', res.data)

      return res.status(200).json({
        status_code: 200,
        success: 'Updated Folder Name',
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


exports.deleteFolder = async (req, res) => {
 // var accessToken = '6oV7JoAgKdkdFfqcvACH4WYBvVl3ZWI0'
  var folderId = req.params.id
  console.log(folderId)

  const url = `https://api.box.com/2.0/folders/${folderId}`
 
  axios
    .delete(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'content-type': 'application/json'
      },
    })
    .then((api_res) => {
      console.log('Success')
      // console.log('resp', res.data)
      if(!folderId){
        return res.status(200).json({
          success:'Folder is not exist'
        })
      }else{
        return res.status(200).json({
          status_code: 200,
          success: 'Delete Folder',
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

