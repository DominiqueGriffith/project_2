var db = require("../models");

var axios = require("axios");
const { sequelize } = require("../models");

module.exports = function(app) {
  app.get("/", function(req,res) {
    res.render("index");
  });

  app.get("/loggedin", function(req,res) {
    if (req.session.loggedin) {
      res.render("loggedin");
    } else {
      res.send("ESTING LOGGEDIN = NOT logged in")
    }
    
    // if (req.session.loggedin) {
    //   // Render home page
    //   db.Books.findAll({
    //     order: sequelize.literal("vote DESC")
    //   }).then(function (results) {
    //     // console.log(results);
    //     var bookVoteArr = [];

    //     var counter = 0;

    //     function cycleGoogleBook() {
    //       if (counter < (results.length) - 1) {
    //         var bookVoteId = results[counter].bookId;
    //         var voteTotal = results[counter].vote;
    //         var searchURL = "https://www.googleapis.com/books/v1/volumes/" + bookVoteId + "?key=" + process.env.apiKey;

    //         axios.get(searchURL).then(function (result) {
    //           // res.json(result.data);



    //           var bookID = result.data.id;
    //           var bookTitle = result.data.volumeInfo.title;
    //           var authorArr = result.data.volumeInfo.authors;
    //           var authors = authorArr.join(", ");
    //           var bookImage = result.data.volumeInfo.imageLinks.thumbnail;

    //           var bookObj = {
    //             id: bookID,
    //             title: bookTitle,
    //             author: authors,
    //             image: bookImage,
    //             vote: voteTotal
    //           };

    //           console.log("this is book obj: " + JSON.stringify(bookObj));
    //           bookVoteArr.push(bookObj);
    //           counter += 1;
    //           cycleGoogleBook();
    //         });

    //       } else {

    //         var bookVoteId = results[counter].bookId;
    //         var voteTotal = results[counter].vote;
    //         var searchURL = "https://www.googleapis.com/books/v1/volumes/" + bookVoteId + "?key=" + process.env.apiKey;

    //         axios.get(searchURL).then(function (result) {
    //           // res.json(result.data);



    //           var bookID = result.data.id;
    //           var bookTitle = result.data.volumeInfo.title;
    //           var authorArr = result.data.volumeInfo.authors;
    //           var authors = authorArr.join(", ");
    //           var bookImage = result.data.volumeInfo.imageLinks.thumbnail;

    //           var bookObj = {
    //             id: bookID,
    //             title: bookTitle,
    //             author: authors,
    //             image: bookImage,
    //             vote: voteTotal
    //           };

    //           console.log("this is book obj: " + JSON.stringify(bookObj));
    //           bookVoteArr.push(bookObj);

    //           console.log("this is the book arr: " + bookVoteArr);
    //           var hbsObject = {
    //             books: bookVoteArr
    //           }
    //           res.render("loggedin", hbsObject);


    //         });

    //       }
    //     }

    //     cycleGoogleBook();

    //   });
    // } else {
    //   // Redirect to login page
    //   res.redirect("/");
    // }



  //   if (req.session.loggedin) {
  //     var hbsObject = {
  //       id: req.session.userID
  //     };
  //     res.render("loggedin", hbsObject);
  //   } else {
  //     res.redirect("/");
  //   }
  // });
  // app.get("/search", function(req,res) {
  //   res.render("search");
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
