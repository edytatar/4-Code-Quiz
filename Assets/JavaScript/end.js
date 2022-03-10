// Declaring variables
var username = document.querySelector("#username");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var finalScore = document.querySelector("#finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");

// saving highscore
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// total amount of highscores that will display on page
var maxHighScores = 5;

// changing text in final score area to the most recent score
finalScore.innerText = mostRecentScore;

// function that is invoked when "save" button is clicked
saveHighScore = e => {
    //Prevents default actions when button is clicked
    e.preventDefault();

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    })

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    return window.location.href = "https://edytatar.github.io/4-Code-Quiz/"
}