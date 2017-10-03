// <!-- 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`. 
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on). 
//    * This data is provided haloby the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages. -->

var games = ["gears of war", "medal of honor", "call of duty", "sniper", "Grand theft auto","hitman","half life"];
function displayGameGifs(){
 
var game = ($(this).attr("data-name"));
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +game+ "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

         
          console.log(response);

          var results = response.data;
          $("#image-container").empty();
          for( let i = 0; i< results.length; i++){

            var gameDiv = $("<div class = 'col-lg-4'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gameImage = $("<img class = 'img-thumbnail .img-responsive'>");
            gameImage.attr("src", results[i].images.fixed_height_still.url);
            gameImage.attr("data-still",results[i].images.fixed_height_still.url);
            gameImage.attr("data-animate",results[i].images.fixed_height.url);
            gameImage.attr("data-state","still");
            gameImage.attr("id", "gif"+i);
            gameImage.css("height","200px");
            gameImage.css("width","200px");
            gameImage.attr("onclick","test("+i+")");
            gameDiv.append(gameImage);
            gameDiv.prepend(p);
            $("#image-container").prepend(gameDiv);

           }
           
        });
          }


        function test(i){
        let id = "#gif"+i;
        let This = $(id);
        let state = ($(id).attr("data-state")); 

        if (state === "still") {
          $(This).attr("src", $(This).attr("data-animate"));
          $(This).attr("data-state", "animate");
        } else {
          $(This).attr("src", $(This).attr("data-still"));
          $(This).attr("data-state", "still");
        }

        }  

        function renderButtons() {

        // Deletes the games prior to adding new games
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-container").empty();

        // Loops through the array of games
        for (var i = 0; i < games.length; i++) {

          // Then dynamicaly generates buttons for each game in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("game");

          a.addClass("btn btn-primary");
          // Added a data-attribute
          a.attr("data-name", games[i]);
          // Provided the initial button text
          a.text(games[i]);
          // Added the button to the buttons-view div
          $("#button-container").append(a);
        }
      }

      // This function handles events where the add game button is clicked
      $("#add-game").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        
        
        var game = $("#usr").val().trim();
        
        if(games.indexOf(game) == -1){  
        games.push(game);
        }
        
        // Calling renderButtons which handles the processing of our game array
        renderButtons();

      });


      // Adding click event listeners to all elements with a class of "game"
      

    //   $("#gif-cont").on("click", function(event) {
    //   console.log("TEST");
    //   var state = $(this).attr("data-state");
    
      
    //   if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    //   } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    //   }
    // });

$(document).on("click", ".game", displayGameGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

    