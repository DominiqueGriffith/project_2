var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req,res) {
    res.render("index");
  });

  app.get("/loggedin", function(req,res) {
    if (req.session.loggedin) {
      var hbsObject = {
        id: req.session.userID
      };
      res.render("loggedin", hbsObject);
    } else {
      res.redirect("/");
    }
  });
  app.get("/search", function(req,res) {
    res.render("search");
  });



  // // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
