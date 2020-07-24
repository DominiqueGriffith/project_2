var db = require("../models");
var axios = require("axios");
var crypto = require('crypto');

module.exports = function (app) {
  // Create account
  app.post("/api", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
      var accountGetObj = {
        username: username
      };

      db.User.findAll({ where: accountGetObj }).then(function (results) {
        if (results.length === 0) {
          var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");
          var postObj = {
            username: username,
            password: hashed_password
          }
          db.User.create(postObj).then(function (results2) {
            res.send("userCreateSuccess");
          });

        } else {
          res.send("userAlreadyExists");
        }
      });

    } else {
      res.send("formNotComplete");
    }
  });

  // login in auth
  app.post("/api/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;


    if (username && password) {
      var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");

      db.User.findAll({
        where: {
          username: username,
          password: hashed_password
        }
      }).then(function (results) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.userID = results[0].id;
          res.send("userLoggedIn");
        } else {
          res.send("wrongPassOrUser");
        }
      });

    } else {
      res.send("noPassOrUser");
    }

  });


  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
