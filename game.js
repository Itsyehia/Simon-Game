var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 1;
var started = false;

// Start the game when a key is pressed
$(document).on("keydown", function(event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Function to generate the next color in the sequence
function nextSequence() {
    userPattern = []; // Clear user pattern for the next level
    var randomNumber = getRandomNumber(0, 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Flash the button
    playSound(randomChosenColour); // Play  sound
}

// Function to handle click on buttons
$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userPattern.length - 1); // Check if the last input matches the game sequence
});

// Function to check if user's sequence matches the game's sequence
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            // Check if the player has entered the entire sequence correctly
            setTimeout(function() {
                level++; // Increment the level
                $("#level-title").text("Level " + level); // Update the level display
                nextSequence(); // Generate the next sequence
            }, 1000); // Wait 1 second before showing next sequence
        }
    } else {
        // Handle incorrect input
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        level = 1 ;
        startOver(); // Reset the game
    }
}

// Function to reset game variables
function startOver() {
    gamePattern = [];
    started = false;
}

// Plays sound for each color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to get a random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
