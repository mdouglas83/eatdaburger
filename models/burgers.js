var orm = require("../config/orm.js");

/* CRUD */
var burger = {
  create: function(cols, vals, callback) {
    orm.create("burgers", cols, vals, function(res) {callback(res)});
  },
  readall: function(callback) {
    orm.readall("burgers", function(res) {callback(res)});
  },
  update: function(objColVals, condition, callback) {
    orm.update("burgers", objColVals, condition, function(res) {callback(res)});
  },
  delete: function(condition, callback) {
    orm.delete("burgers", condition, function(res) {callback(res)});
  }
};

module.exports = burger;
