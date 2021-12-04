//Start the execution when DOM is ready
$(document).ready(function () {

  //Calling the fetchPost function whenever User clicks on Show Post Button
  $(".showPost").click(async function () {
    let postTable = $("#postTable");
    let commentTable = $("#commentTable");

    //Checking whether Comment table exists or not before fetching Post Items
    if(commentTable.length){ 
      //if Comment table exists remove that
      $(commentTable).remove();
      if (postTable.length) {
          //if Post table already exists remove that
        $(postTable).remove();
      } else {
        //else fetch the Post Items
        fetchPost();
      }
    } else{
         //if Comment table doesn't exists
         $(commentTable).remove();
      if (postTable.length) {
          //if Post table already exists remove that
        $(postTable).remove();
      } else {
           //else fetch the Post Items
        fetchPost();
      }
    }
   
  });

 //Calling the fetchComment function whenever User clicks on Show Comment Button
  $(".showComment").click(async function () {
    let postTable = $("#postTable");
    let commentTable = $("#commentTable");
      //Checking whether Post table exists or not before fetching Comment Items
    if (postTable.length) {
           //if Post table already exists remove that
      $(postTable).remove();
      if (commentTable.length) {
             //if Comment table already exists remove that
        $(commentTable).remove();
      } else {
          //else fetch the Comment Items
        fetchComments();
      }
    } else{
      //if Post table doesn't exists
      if (commentTable.length) {
            //if Comment table already exists remove that
        $(commentTable).remove();
      } else {
            //else fetch the Comment Items
        fetchComments();
      }
    }
  });
});

//Function to Fetch Post Items
const fetchPost = () => {
  //Calling the fetch Posts API
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      var data = json;
      if (data.length > 0) {
        //Grabbing and storing the keys of Fetched Posts
        var keys = Object.keys(data[0]);
        //Creating postTable to display Post Items
        var table = `<table id="postTable"></table>`;
       //Creating title for the table 
        var titleRow = "<tr></tr>";
        var titleHead = "<th></th>";
        var title = "<h1>Post Items</h1>";
        titleHead = $(titleHead).append(title);
        titleRow = $(titleRow).append(titleHead);
        table = $(table).append(titleRow);
      //Creating table rows and appending the Fetched Post keys inside that
        var trHead = "<tr></tr>";
        $(keys).each((index, item) => {
          var th = "<th></th>";
          th = $(th).html(item);
          trHead = $(trHead).append(th);
        });
        table = $(table).append(trHead);
          //Creating table datas and appending the Fetched Post Items inside that
        for (var i = 0; i < data.length; i++) {
          var tr = "<tr></tr>";
          $(keys).each((index, item) => {
            var td = "<td></td>";
            td = $(td).html(data[i][item]);
            tr = $(tr).append(td);
          });
          table = $(table).append(tr);
        }
        //appending the table inside the main div
        $("#tableElement").append(table);
      }
    })
    .catch((err) => {
       //Display Error message if Fetch API fails
      showErrorMsg(".errorMessage", err, 2000);
    });
};

//Function to Fetch Comment Items
const fetchComments = () => {
  //Calling the fetch Comments API
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      var data = json;
      if (data.length > 0) {
        if (data.length > 0) {
           //Grabbing and storing the keys of Fetched Comment
          var keys = Object.keys(data[0]);
             //Creating postTable to display Comment Items
          var table = `<table id="commentTable"></table>`
            //Creating title for the table 
          var titleRow = "<tr></tr>";
          var titleHead = "<th></th>";
          var title = "<h1>Comment Items</h1>";
          titleHead = $(titleHead).append(title);
          titleRow = $(titleRow).append(titleHead);
          table = $(table).append(titleRow);
  //Creating table rows and appending the Fetched Comment keys inside that
          var trHead = "<tr></tr>";
          $(keys).each((index, item) => {
            var th = "<th></th>";
            th = $(th).html(item);
            trHead = $(trHead).append(th);
          });
          table = $(table).append(trHead);
              //Creating table datas and appending the Fetched Comment Items inside that
          for (var i = 0; i < data.length; i++) {
            var tr = "<tr></tr>";
            $(keys).each((index, item) => {
              var td = "<td></td>";
              td = $(td).html(data[i][item]);
              tr = $(tr).append(td);
            });
            table = $(table).append(tr);
          }
              //appending the table inside the main div
          $("#tableElement").append(table);
        }
      }
    })
    .catch((err) => {
      //Display Error message if Fetch API fails
      showErrorMsg(".errorMessage", err, 2000);
    });
};

//Function to show the Error Message
/**
 * @param {Object} el HTML element inside which we need to show the Error Message
 * * @param {String} msg Error Message
 * * @param {Boolean} autohide Check whether to show or hide the HTML element or noyt
 */
const showErrorMsg = (el, msg, autohide = false) => {
  $(el).css("display", "block").text(msg);
  if (autohide) {
    setTimeout(function () {
      $(el).slideUp();
    }, autohide);
  }
};
