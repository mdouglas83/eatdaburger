var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  // Helper function for SQL syntax
  // e.g. 3 values into the mySQL query
  // Create Array then convert to string
  // ["?", "?", "?"].toString() => "?,?,?"
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check and skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Big Mac => 'Big Mac')
      if (typeof value === "string" && value.indexOf(" ") >= 0) value = "'" + value + "'";
      // e.g. {burger: 'Big Mac'} => ["burger='Big Mac'"]
      // e.g. {eaten: true} => ["eaten=true"]
      arr.push(key + "=" + value);
    }
  }
  // return single comma-separated string
  return arr.toString();
}

// Simple CRUD operations defined in an object
// SQL commands are created from column and value arrays
// Commands are then executed on the open connection
var orm = {
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  readall: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  // objColVals example ... {burger: 'Big Mac', eaten: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;
