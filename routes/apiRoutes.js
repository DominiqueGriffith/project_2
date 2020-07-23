var db = require("../models");

var crypto = require('crypto');

module.exports = function (app) {
  // Create account
  app.post("/api", function (req, res) {
    var username = req.body.postUsername;
    var password = req.body.postPassword;

    console.log(req.body.postUsername);

    var hashed_password = crypto.createHash("sha1").update(req.body.postPassword).digest("hex");

    var postObj = {
      username: username,
      password: hashed_password
    }
    db.User.create(postObj).then(function (dbExample) {
      res.redirect("/");
    });
  });

  // login in auth
  app.post("/api/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");

    if (username && password) {
      db.User.findAll({
        where: {
          username: username,
          password: hashed_password
        }
      }).then(function (results) {
        if (results.length > 0) {
          res.render("loggedin");
        } else {
          console.log("Incorrect Username and/or Password");
          res.render("index", {
            msg: "Incorrect Username and/or Password"
          });
        }
      });

    } else {
      console.log("Please enter Username and Password");
      res.render("index", {
        msg: "Please enter Username and Password"
      });
    }

  });


  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
