var mysql = require("mysql");

const Z = 0; /* Server index */

cnxn = [
  {
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burger_db"
  }, 
  {
    port: 3306,
    host: "fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "usppozqgazk2ziya",
    password: "ok6f7bsgd0y1kw4c",
    database: "z6fvdf4tb9zzqu11"
  }
];

var connection = mysql.createConnection(cnxn[Z]);
connection.connect(function(err) {
  if (err) return console.error("error connecting: " + err.stack);
  console.log("connected to mysql://" + cnxn[Z].host + ":" + cnxn[Z].port + " (thread " + connection.threadId + ")");
});

module.exports = connection;
