const mysql = require ('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root12',
    database : 'eduwork-cruds',
  });
  
  module.exports = connection;