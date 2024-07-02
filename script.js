var colors = ["green","red","yellow","blue"];

let colors_dict = {
    "a": "green",
    "s": "red",
    "d": "yellow",
    "f": "blue"
};

var playerPattern = [];
var computerPattern = [];
var started = false;
var level = 0;

//game starter - starts the game once you click enter 
$(document).keydown(function(event){
    if (started === false && event.key === "Enter") {
        game();
        started = true;
    }
});

//random color choosing function to add to the computer pattern
function chooseRandomColor() {
    $("h1").text("Level " + level);
    var number = Math.floor(Math.random() * colors.length);
    var color = colors[number];
    computerPattern.push(color);
    makePlay(color);
}

//function for the sound and animation when a button is pressed/clicked
function makePlay(color) {
    var sound = "sounds/" + color + ".mp3";
    var audio = new Audio(sound);
    audio.play();
    $("#" + color).addClass("hide");
    setTimeout(function() {
        $("#" + color).removeClass("hide");
    }, 200);
}

//checking answer function, compares it to the pattern that the computer made 
function checkAnswer() {
    for (var i = 0; i < playerPattern.length; i++) {
        if (playerPattern[i] !== computerPattern[i]) {
            console.log("Wrong")
            var audio = new Audio("sounds/wrong.mp3")
            audio.play();
            $("body").addClass("game-over");
            document.getElementById("level-title").style.fontSize = "2.25rem";
            $("#level-title").text("Game Over, Press Enter to Restart");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            restart();
        }
    }
    if (playerPattern.length === computerPattern.length) {
        setTimeout(game, 1000);
        playerPattern = [];
    }
}

//main game function
function game() {
    level++;
    setTimeout(chooseRandomColor, 500);
}

//for clicks on the buttons
$(".btn").click(function() {
    var buttonid = this.id;
    makePlay(buttonid);
    playerPattern.push(buttonid);
    console.log(playerPattern)
    checkAnswer();
});

//for the respective key presses of the buttons 
$(document).keydown(function(event) {
    if (colors_dict[event.key]) {
        var color = colors_dict[event.key];
        makePlay(color);
        playerPattern.push(color);
        console.log(playerPattern)
        checkAnswer();
    }
});

//restarts the game when you click the restart button
$("#restart").click(function(){
    $("h1").text("Press Enter to Start")
    restart();
});

//full restart function
function restart(){
    level = 0;
    computerPattern = [];
    gamePattern = [];
    started = false;
}