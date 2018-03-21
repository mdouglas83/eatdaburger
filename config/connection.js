var mysql = require("mysql");

const Z = 1; /* Server index */

const cnxn = [
  {
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burger_db"
  }, 
  {
    port: 3306,
    host: "us-cdbr-iron-east-05.cleardb.net",
    user: "b54acb56edc97a",
    password: "f625417e",
    database: "heroku_0763d0b06d53eb6"
  }
];

var connection = mysql.createConnection(cnxn[Z]);
connection.connect(function(err) {
  if (err) return console.error("error connecting: " + err.stack);
  console.log("connected to mysql://" + cnxn[Z].host + ":" + cnxn[Z].port + " (thread " + connection.threadId + ")");
});

module.exports = connection;
