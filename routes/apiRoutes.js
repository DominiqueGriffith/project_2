var db = require("../models");
var axios = require("axios");
var crypto = require('crypto');
const { sequelize } = require("../models");

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

  // vote for book
  app.put("/api/vote", function(req,res) {
    console.log("googleid: " + req.body.googleId);

    db.Books.update({
        vote: sequelize.literal("vote + 1")
    }, {
        where: {
            bookId: req.body.googleId
        }
    }).then(function(result) {
        console.log(result);
        res.json(result);
    });
});

  // book search
  app.get("/api/search", function (req, res) {
    var searchURL = "https://www.googleapis.com/books/v1/volumes?q=" + req.query.q + "&projection=lite&key=" + process.env.apiKey;

    console.log("URL: " + searchURL);

    axios.get(searchURL).then(function (result) {
      // res.json(result.data);

      console.log(result.data);

      var bookArr = [];

      for (var i = 0; i < 5; i++) {
        var bookID = result.data.items[i].id;
        var bookTitle = result.data.items[i].volumeInfo.title;
        var authorArr = result.data.items[i].volumeInfo.authors;
        var authors = authorArr.join(", ");
        var bookImage = result.data.items[i].volumeInfo.imageLinks.thumbnail;

        var bookObj = {
          id: bookID,
          title: bookTitle,
          author: authors,
          image: bookImage
        };

        bookArr.push(bookObj);

      };

      // console.log("new array: " + JSON.stringify(bookArr));
      if (req.session.loggedin) {
        var idAndBookObj = {
          bookArr: bookArr,
          userID: req.session.userID
        }

        res.json(idAndBookObj);
      } else {
        res.json(bookArr);
      }
    });
  });
  // add book
  app.post("/api/addbook", function (req, res) {

    var UserId = req.body.userId;
    var bookId = req.body.bookId;
    var BookName = req.body.BookName;

    var postObj = {
      UserId: UserId,
      bookId: bookId,
      BookName: BookName
    }

    db.Books.create(postObj).then(function (result) {
      res.json(result);

    })

  });

};
