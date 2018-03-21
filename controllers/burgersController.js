var express = require("express");
var router = express.Router();
var burger = require("../models/burgers.js");

/* C */
    //
router.post("/api/burgers", function(req, res) {
  burger.create(["burger"], [req.body.burger], function(result) {
    // No need to send back the ID of the new record since we will refresh the page.
    // res.json({id: result.insertId});
    res.status(200).end();
  });
});

/* R */
    //
router.get("/", function(req, res) {
  burger.readall(function(data) {
    var hbsObject = {burgers: data};
    console.log(hbsObject);
    res.render("index", hbsObject);
    res.status(200).end();
  });
});

/* U */
    //
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update({eaten: true}, condition, function(result) {
    if (result.changedRows === 0) {
      // If no rows were changed, assume ID does not exist, return 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

/* D */
    //
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition, function(result) {
    if (result.affectedRows === 0) {
      // If no rows were changed, assume ID does not exist, return 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
