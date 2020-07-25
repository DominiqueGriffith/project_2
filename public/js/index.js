console.log("I'm JS!")
$("#login-button").on("click", function () {
  var username = $("#username").val().trim();
  var password = $("#password").val().trim();

  $.ajax({
    type: "POST",
    url: "/api/login",
    data: {
      username: username,
      password: password
    }
  }).then(function (response) {
    console.log(response);
    if (response === "noPassOrUser") {
      $("#modal-msg").empty();
      var newPara = $("<p>").text("Must enter Username and Password");
      $("#modal-msg").append(newPara);
    } else if (response === "wrongPassOrUser") {
      $("#modal-msg").empty();
      var newPara = $("<p>").text("Incorrect Username and/or Password");
      $("#modal-msg").append(newPara);
    } else if (response === "userLoggedIn") {
      window.location.href = "/loggedin";
    }
  });
});

$("#create-button").on("click", function () {
  var username = $("#postUsername").val().trim();
  var password = $("#postPassword").val().trim();

  $.ajax({
    type: "POST",
    url: "/api",
    data: {
      username: username,
      password: password
    }
  }).then(function (response) {
    console.log(response);
    if (response === "formNotComplete") {
      $("#modal2-msg").empty();
      var newPara = $("<p>").text("Please complete the registration form");
      $("#modal2-msg").append(newPara);
    } else if (response === "userAlreadyExists") {
      $("#modal2-msg").empty();
      var newPara = $("<p>").text("Account already exists with that username");
      $("#modal2-msg").append(newPara);
    } else if (response === "userCreateSuccess") {
      $("#modal2-msg").empty();
      var newPara = $("<p>").text("Account successfully created. You may now login.");
      $("#modal2-msg").append(newPara);
    }
  });
});






// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function (example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function () {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function () {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

// book submit onclick
$("#book-submit").on("click", function () {
  console.log("I'm clicked!!!")
  event.preventDefault();
  var searchTerm = $("#booksearch").val();
  console.log(searchTerm);


  var searchURL = "/api/search?q=" + searchTerm;
  console.log(searchURL);
  $.ajax({
    type: "GET",
    url: searchURL
  }).then(function (result) {
    console.log(result);

    if (result.userID) {

      var currentUser = result.userID;

      var bookArr = result.bookArr;

      for (var i = 0; i < bookArr.length; i++) {
        var newDiv = $("<div>").addClass("col-6");
        var newImg = $("<img>").attr("src", bookArr[i].image);
        newDiv.append(newImg);
        var newTitle = $("<p>").text("Title: " + bookArr[i].title);
        newDiv.append(newTitle);
        var newAuthor = $("<p>").text("Author(s): " + bookArr[i].author);
        newDiv.append(newAuthor);
        var newButton = $("<button>").addClass("btn btn-primary add-book").attr("type", "button").attr("data-user_id", currentUser).attr("data-book_id", bookArr[i].id).text("Add Book");
        newDiv.append(newButton);
        var newHr = $("<hr>");
        newDiv.append(newHr);

        $("#book-info").append(newDiv);

      }



    } else {

      for (var i = 0; i < result.length; i++) {
        var newDiv = $("<div>").addClass("col-6");
        var newImg = $("<img>").attr("src", result[i].image);
        newDiv.append(newImg);
        var newTitle = $("<p>").text("Title: " + result[i].title);
        newDiv.append(newTitle);
        var newAuthor = $("<p>").text("Author(s): " + result[i].author);
        newDiv.append(newAuthor);
        var newHr = $("<hr>");
        newDiv.append(newHr);

        $("#book-info").append(newDiv);

      }

    }




  });
});

// Book submit onclick

$("#book-submit").on("click", function () {
  event.preventDefault();
  var searchTerm = $("#booksearch").val();
  console.log("click button works")
  console.log(searchTerm);


  var searchURL = "/api/search?q=" + searchTerm;
  console.log(searchURL);
  $.ajax({
    type: "GET",
    url: searchURL
  }).then(function (result) {
    console.log(result);

    if (result.userID) {

      var currentUser = result.userID;

      var bookArr = result.bookArr;

      for (var i = 0; i < bookArr.length; i++) {
        var newDiv = $("<div>").addClass("col-6");
        var newImg = $("<img>").attr("src", bookArr[i].image);
        newDiv.append(newImg);
        var newTitle = $("<p>").text("Title: " + bookArr[i].title);
        newDiv.append(newTitle);
        var newAuthor = $("<p>").text("Author(s): " + bookArr[i].author);
        newDiv.append(newAuthor);
        var newButton = $("<button>").addClass("btn btn-primary add-book").attr("type", "button").attr("data-user_id", currentUser).attr("data-book_id", bookArr[i].id).text("Add Book");
        newDiv.append(newButton);
        var newHr = $("<hr>");
        newDiv.append(newHr);

        $("#book-info").append(newDiv);

      }



    } else {

      for (var i = 0; i < result.length; i++) {
        var newDiv = $("<div>").addClass("col-6");
        var newImg = $("<img>").attr("src", result[i].image);
        newDiv.append(newImg);
        var newTitle = $("<p>").text("Title: " + result[i].title);
        newDiv.append(newTitle);
        var newAuthor = $("<p>").text("Author(s): " + result[i].author);
        newDiv.append(newAuthor);
        var newHr = $("<hr>");
        newDiv.append(newHr);

        $("#book-info").append(newDiv);

      }

    }




  });
});

// add book
// $(document).on("click",".add-book", function() {
//   var userID = $(this).data("user_id");
//   var bookID = $(this).data("book_id");


//   // store userID and bookID locally in javascript
//   //  modal is triggered grab info in onclick (local info), send info to modal together

//   $.ajax({
//       type: "POST",
//       url: "/api/addbook",
//       data: {
//           userID: userID,
//           bookID: bookID
//       }
//   }).then(function (response) {
//       console.log(response);

//   });
// });

