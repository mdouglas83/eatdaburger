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
    host: "ixqxr3ajmyapuwmi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "s0sv82h9wmevzdzn",
    password: "uzks6dnbpib7iq4k",
    database: "f4sjx8y4ug40m2k8"
  }
];

var connection = mysql.createConnection(cnxn[Z]);
connection.connect(function(err) {
  if (err) return console.error("error connecting: " + err.stack);
  connection.query("CREATE DATABASE IF NOT EXISTS " + cnxn[Z].database, function(err) {
    if (err) return console.error("error: could not create " + cnxn[Z].database);
    connection.query("USE " + cnxn[Z].database, function(err) {
      if (err) return console.error("error: could not switch to burger_db");
      console.log("connected to mysql://" + cnxn[Z].host + ":" + cnxn[Z].port + " (thread " + connection.threadId + ")");
      connection.query(
        "CREATE TABLE IF NOT EXISTS burgers (" +
        "id int NOT NULL AUTO_INCREMENT, " +
        "burger varchar(255) NOT NULL, " +
        "eaten BOOLEAN DEFAULT false, " +
        "PRIMARY KEY (id))", function(err) {
        if (err) return console.error("error: could not create table burgers");
        connection.query("SELECT COUNT(*) FROM burgers", function(err, result) {
          if (err) return console.error("error: could not retrive record count from burgers");
          // TEMP TEMP TEMP
          console.log(result);
          if (result === 0) {
            var sql = "INSERT INTO burgers (burger, eaten) VALUES ?";
            var values = [
              ['Big Mac', false],
              ['Quarter Pounter', false],
              ['Cajun Chicken Sandwich', false],
              ['Belly Burger', true]
            ];
            connection.query(sql, values, function(err, result) {
              if (err) return console.error("error: could not insert records into burgers");
              console.log("inserted " + result.affectedRows + " into burgers");
            });
          }
        });
      });
    });
  });
});

module.exports = connection;
