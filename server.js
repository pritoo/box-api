const mysql = require('mysql');
const app =require("./app");
const { db } = require("./config/database");

const port = 4000

app.listen(port);
console.log(`server is running on port ${port}`)