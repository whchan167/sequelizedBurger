var express = require("express");

var router = express.Router();

// requiring burger models
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
//retrieve all burgers database and displays back to html
  db.burgers.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
//create a new burger and render it back to the html
  db.burgers.create({
    burger_name: req.body.burger_name,
    devoured: false
  }). then(function(data){
    res.redirect("/");
  })
});


router.put("/:id", function(req, res) {
  var id = req.params.id;
 //update burgers by requiring id 
  db.burgers.update({
    devoured: true
  }, {
    where: {
      id: id
    }
  }).then(function(data){    
  res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;