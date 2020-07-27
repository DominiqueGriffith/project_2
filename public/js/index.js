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

      var userSearch = $("<h3>").text("Your Search: " + searchTerm);



      for (var i = 0; i < bookArr.length; i++) {
        var newDiv = $("<div>").addClass("col-md-12");
        // var newDivTextBox = $("<div>").addClass("col-6");


        // var bookReviewDiv = $("<div>").addClass("col-md-3");

        //  $("#user-book-review").append(bookReviewDiv);


        $("#user-Search").append(userSearch);
        var newImg = $("<img>").attr("src", bookArr[i].image).addClass("img img-thumbnail").attr("width", "200px").attr("height", "200px");
        newDiv.append(newImg);
        var newTitle = $("<p>").text("Title: " + bookArr[i].title);
        newDiv.append(newTitle);
        var newAuthor = $("<p>").text("Author(s): " + bookArr[i].author);
        newDiv.append(newAuthor);

        //  Text Area
        var textArea = $("<textarea>").addClass("form-control").attr("row", "5").attr("id", "comment");
        var labelComment = $("<label>").attr("for", "comment");
        labelComment.prepend(textArea);
        var textBoxDiv = $("<div>").addClass("form-group");
        textBoxDiv.prepend(labelComment);
        $(newDiv).append(textBoxDiv);

        var newButton = $("<button>").addClass("btn btn-primary add-book").attr("type","button").attr("data-user_id", currentUser).attr("data-book_id", bookArr[i].id).attr("data-book_title",bookArr[i].title).text("Add Book");
        // var newButton = $("<button>").addClass("btn btn-primary add-book").attr("type", "button").attr("data-user_id", currentUser).attr("data-book_id", bookArr[i].id).text("Add Book").attr("id", "add-book-info").attr("data-toggle", "modal").attr("data-target", "#add-book-info").attr("data-whatever", "@mdo");
        var svgLikeButton = $('<button class="btn btn-primary like-book"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/></svg>');
        // var likePath = $("<path>").attr("fill-rule", "evenodd").attr("d", "M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z")
        // var likeIcon = $("<svg>").addClass("bi bi-hand-thumbs-up").attr("width", "1em").attr("height", "1em").attr("viewBox", "0 0 16 16").attr("fill", "currentColor").attr("xmlns", "http://www.w3.org/2000/svg")
        // likeIcon.prepend(likePath);

        //  likeButton.prepend(likeIcon); 

        svgLikeButton.attr("id", "vote-modal").attr("data-toggle", "modal").attr("data-target", "#vote-modal").attr("data-whatever", "@mdo");
        //  $(newDivTextBox).append(textBoxDiv);


        newDiv.append(newButton);
        // newDiv.append("<button class= 'btn btn-warning' <svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-hand-thumbs-up' fill='currentColor' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' d='M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z'/></svg></button>");
        newDiv.append(svgLikeButton);

        var bookReview = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." + currentUser);
        newDiv.append(bookReview);
        var newHr = $("<hr>").addClass("solid");

        $(newDiv).append(newHr);


        $("#book-info").append(newDiv);


        $("body").on("click", "#add-book-info", function () {
          ("I've been CLICKKKKKKED")
          var modalDiv = $("<div>").addClass("col-6");
          modalDiv.append(newImg);
          modalDiv.append(newTitle);
          modalDiv.append(newAuthor);
          // modalDiv.append(bookArr[i].id)
          $("#book-info-modal").append(modalDiv);


        })
      }



    } else {

      for (var i = 0; i < result.length; i++) {
        var newDiv = $("<div>").addClass("col-md-6");
        var newImg = $("<img>").attr("src", result[i].image);
        newDiv.append(newImg);
        var newTitle = $("<p>").text("Title: " + result[i].title);
        newDiv.append(newTitle);
        var newAuthor = $("<p>").text("Author(s): " + result[i].author);
        newDiv.append(newAuthor);
        var newHr = $("<hr>");
        newDiv.append(newHr);

        //  Text Area
        var textArea = $("<textarea>").addClass("form-control").attr("row", "5").attr("cols", "50").attr("id", "comment");
        var labelComment = $("<label>").attr("for", "comment");
        labelComment.prepend(textArea);
        var textBoxDiv = $("<div>").addClass("form-group");
        textBoxDiv.prepend(labelComment);
        $(newDivTextBox).append(textBoxDiv);

        $("#text-box").append(newDivTextBox);
        $("#book-info").append(newDiv);




      }

    }




  });
});

$(document).on("click", ".add-book", function () {
  var userId = $(this).data("user_id");
  var bookId = $(this).data("book_id");
  var BookName = $(this).data("book_title");

  console.log("sending obj vars: " + userId + " : " + bookId + " : " + BookName);

  $.ajax({
    type: "POST",
    url: "/api/addbook",
    data: {
      userId: userId,
      bookId: bookId,
      BookName: BookName
    }
  }).then(function (response) {
    console.log(response);

  });
});

// add book
$(document).on("click", "#add-book-info", function () {
  var userID = $(this).data("user_id");
  var bookID = $(this).data("book_id");

  // var title = $(this).data("book_title");
  // var authors = $(this).data("book_authors");
  // var image = $(this).data("book_image");


  // store userID and bookID locally in javascript
  //  modal is triggered grab info in onclick (local info), send info to modal together

  $.ajax({
    type: "POST",
    url: "/api/addbook",
    data: {
      userID: userID,
      bookID: bookID,
      // title: title,
      // authors: authors,
      // image: image
    }
  }).then(function (response) {
    console.log(response);

  });
});

