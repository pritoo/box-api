const express = require('express');
const bodyparser = require('body-parser');


const app = express();
const { db } = require("./config/database");



//use express static folder
app.use(express.static("./public"))

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true}))


//importing routes
const folder = require('./routes/folderRoute')
const file = require('./routes/fileRoute')

//using middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//routes use
app.use("/api/v1",folder);
app.use("/api/v1",file);

module.exports = app