let playerScore = 0;
let randomButtonID;

$(".board").css("visibility", "hidden");

$("#start_btn").on("click", function () {
   startGame();
});

function startGame() {
   setTimeout(function () {
      $("#start_btn").fadeOut();
   }, 500);

   $(".board").css("visibility", "visible");

   setTimeout(function () {
      setBoard();
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

   R += 3;
   G += 3;
   B += 3;

   let diffColor = "rgb(" + R + "," + G + "," + B + ")";
   randomButtonID = "button_" + (Math.floor(Math.random() * 4) + 1);
   $("#" + randomButtonID).css("backgroundColor", diffColor);
}

function checkCorrect(buttonID) {
   if (buttonID == randomButtonID) {
      updateScoreBy(50);
   } else {
      gameOver();
   }
   checkWinner();
   setBoard();
}

function checkWinner() {
   if (playerScore >= 1000) {
      $(".board").css("visibility", "hidden");
      $("#player_one").addClass("winner_color");
      $("#player_one").text("🚩You Won!🚩");

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
   playerScore += score;
   $(".player_points").text(playerScore + "pt");
}

function startOver() {
   playerScore = 0;
   $(".winner_flag_p1").css("display", "none");
   $("#player_one").text("Points: " + playerScore + "pt");
   $("#player_one").removeClass("winner_color");
   setBoard();
   checkWinner();
}

function gameOver() {
   $("#player_one").text("You Lost :), better luck next time");

   $(".board").css("visibility", "hidden");
   setTimeout(function () {
      $("#start_btn").fadeIn();
      $("#start_btn").text("Restart!");
      $("#start_btn").click(function () {
         startOver();
      });
   }, 1000);
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