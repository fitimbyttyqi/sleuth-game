let p1Score = 0;
let p2Score = 0;

let hasWinner = false;
let currentPlayer;
let randomButtonID;

$(".board").css("visibility", "hidden");

$("#start_btn").on("click", function () {
   startGame();

   setTimeout(function () {
      setBoard();
   }, 1000);
});

function startGame() {
   $(".board").css("visibility", "visible");

   currentPlayer = Math.floor(Math.random() * 2) + 1;

   if (currentPlayer == 1) {
      $("#player_one").addClass("player_highlight");
   } else {
      $("#player_two").addClass("player_highlight");
   }

   setTimeout(function () {
      $("#start_btn").fadeOut();
   }, 500);

}

function setBoard() {

   $(".board").fadeIn();

   let R = Math.floor(Math.random() * 235);
   let G = Math.floor(Math.random() * 235);
   let B = Math.floor(Math.random() * 235);
   let color = "rgb(" + R + "," + G + "," + B + ")";

   $("#button_1").css("backgroundColor", color);
   $("#button_2").css("backgroundColor", color);
   $("#button_3").css("backgroundColor", color);
   $("#button_4").css("backgroundColor", color);

   R += 5;
   G += 5;
   B += 5;

   let diffColor = "rgb(" + R + "," + G + "," + B + ")";
   randomButtonID = "button_" + (Math.floor(Math.random() * 4) + 1);
   $("#" + randomButtonID).css("backgroundColor", diffColor);
}

function checkCorrect(buttonID) {
   if (buttonID == randomButtonID) {
      updateScoreBy(1);
   } else {
      updateScoreBy(-1);
   }
   checkWinner();
   setBoard();
   if (!hasWinner) {
      switchPlayer();
   }
}

function checkWinner() {
   if (p1Score == 10) {
      $(".board").css("visibility", "hidden");
      $(".winner_flag_p1").css("display", "inline");
      $("#player_one").addClass("winner_color");
      $("#player_two").removeClass("player_highlight");
      hasWinner = true;

      setTimeout(function () {
         $("#start_btn").fadeIn();
         $("#start_btn").text("Restart!");
         $("#start_btn").click(function () {
            startOver();
         });
      }, 1000);
   } else if (p2Score == 10) {
      $(".board").css("visibility", "hidden");
      $(".winner_flag_p2").css("display", "inline");
      $("#player_two").addClass("winner_color");
      $("#player_one").removeClass("player_highlight");
      hasWinner = true;

      setTimeout(function () {
         $("#start_btn").fadeIn();
         $("#start_btn").text("Restart!");
         $("#start_btn").click(function () {
            startOver();
         });
      }, 1000);
   }
}

function updateScoreBy(score) {
   if (currentPlayer == 1) {
      p1Score += score;
      if (p1Score == -1) {
         updateScoreBy(1)
      }
   } else {
      p2Score += score;
      if (p2Score == -1) {
         updateScoreBy(1)
      }
   }
   $("#score_one").text(p1Score);
   $("#score_two").text(p2Score);
}

function switchPlayer() {
   if (currentPlayer == 1) {
      currentPlayer = 2;
      $("#player_one").removeClass("player_highlight");
      $("#player_two").addClass("player_highlight");
   } else {
      currentPlayer = 1;
      $("#player_one").addClass("player_highlight");
      $("#player_two").removeClass("player_highlight");
   }
}

function startOver() {
   p1Score = 0;
   p2Score = 0;
   hasWinner = false;
   $("#player_one").removeClass("winner_color");
   $("#player_two").removeClass("winner_color");
   $("#player_one").removeClass("player_highlight");
   $("#player_two").removeClass("player_highlight");


   $("#score_one").text(p1Score);
   $("#score_two").text(p2Score);
   $(".winner_flag_p1").css("display", "none");
   $(".winner_flag_p2").css("display", "none");

   startGame();
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

$("#go_back_btn").click(function () {
   window.location.href = 'index.html';
});