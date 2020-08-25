let playerScore = 0;
let missCounter = 0;

let randomButtonID;
let sound = new Audio("../sounds/sound.mp3");

$(".board").css("visibility", "hidden");

$("#start_btn").on("click", startGame);

function startGame() {

   $("#start_btn").fadeOut(500).fadeIn(500).text("Restart!");

   $(".board").css("visibility", "visible");

   setTimeout(function () {
      setBoard();
   }, 500);
}

function setBoard() {

   let R = Math.floor(Math.random() * 235);
   let G = Math.floor(Math.random() * 235);
   let B = Math.floor(Math.random() * 235);
   let color = "rgb(" + R + "," + G + "," + B + ")";

   $("#button_1").css("backgroundColor", color);
   $("#button_2").css("backgroundColor", color);
   $("#button_3").css("backgroundColor", color);
   $("#button_4").css("backgroundColor", color);

   R += 4;
   G += 4;
   B += 4;

   let diffColor = "rgb(" + R + "," + G + "," + B + ")";
   randomButtonID = "button_" + (Math.floor(Math.random() * 4) + 1);
   $("#" + randomButtonID).css("backgroundColor", diffColor);

}

function checkCorrect(buttonID) {
   $("#start_btn").click(function () {
      startOver();
   });
   if (buttonID == randomButtonID) {
      missCounter = 0;
      updateScoreBy(50);
      $("#sign").text("+");
      $("#sign").css("color", "green");
   } else {
      if (missCounter > 0) {
         gameOver();
      } else {
         missCounter++;
         $("#sign").text("- you've been give another chance, don't miss it!");
         $("#sign").css("color", "red");
      }
   }
   checkWinner();
   setBoard();
}

function checkWinner() {
   if (playerScore == 1000) {
      $(".board").css("visibility", "hidden");
      $("#winner").addClass("winner_color");
      $("#winner").text("🚩You Won!🚩");
      $("#sign").empty();
      $("#start_btn").click(function () {
         startOver();
      });
   }
}

function updateScoreBy(score) {
   playerScore += score;
   $(".player_points").text(playerScore);
}

function startOver() {
   playerScore = 0;
   missCounter = 0;
   $(".player_points").text(playerScore);
   $("#sign").empty();
   $("#winner").empty();
   $("#winner").removeClass("winner_color looser_color");
   setBoard();
}

function gameOver() {
   $("#winner").addClass("looser_color");
   $("#winner").text("You lost :(, better luck next time!");
   $("#sign").empty();
   $(".board").css("visibility", "hidden");
   $("#start_btn").click(function () {
      startOver();
   });
}

$("#button_1").click(function () {
   checkCorrect("button_1");
});

$("#button_2").click(function () {
   checkCorrect("button_2");
});

$("#button_3").click(function () {
   checkCorrect("button_3");
});

$("#button_4").click(function () {
   checkCorrect("button_4");
});

$("#goback_btn").on("click", function () {
   sound.play();
   setTimeout(function () {
      window.open("../index.html", "_self");
   }, 300);
});

$("#start_btn").on("click", function () {
   sound.play();
});