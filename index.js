var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var gameState = "Not Started"
var i = 0;

function pressAdd (color){
  var correctAudio = new Audio ("sounds/" + color + ".mp3")
  $("." + color).addClass("pressed");
  correctAudio.play();
  setTimeout(function () {
    $("." + color).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (e){
  if (e.key === "a"){
    $("h1").text("Level " + level);
    if (gameState === "Not Started"){
    nextSequence();
    gameState = "Started";
  }
  }
})

$("div [type='button']").click(function (){
  if (gameState === "Started"){
  var colorChosen = $(this).attr("id");
  userClickedPattern.push(colorChosen);
  pressAdd(colorChosen);
  checkAnswer(userClickedPattern.length-1);
}
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length)
    setTimeout(function () {
      replay();
    }, 500);
  }

else {
  console.log("fail");
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press 'A' to Restart.");
  startOver();
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  }
}

function nextSequence () {
  var randomNumber = Math.floor((Math.random()*4));
  var randomColor = buttonColors[randomNumber];
  var randomColorChosen = $("." + randomColor);

  gamePattern.push(randomColor);
  pressAdd(randomColor);

  level++;
  $("h1").text("Level " + level)
}

function startOver () {
  level = 0;
  gameState = "Not Started";
  gamePattern = [];
  userClickedPattern = [];
}

function replay () {

    setTimeout (function () {

    var replayThis = gamePattern[i];
    pressAdd(replayThis);
    gameState = "Wait"
    i++;

  if (i < gamePattern.length) {replay();
  }
    else {
      i=0;
      gameState= "Started";
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 500);
    }
  }, 500);
}
