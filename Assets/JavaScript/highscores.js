// Declaring variables
var highScoresList = document.querySelector("#highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Changing high score text
highScoresList.innerHTML =
    highScores.map(score => {
        // returning and joining as a string
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("")