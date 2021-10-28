// Declaring variables 
var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progress-text");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// The 10 questions that are used in the quiz
var questions = [
    {
        question: "Inside which HTML element do we put JavaScript?",
        choice1: "<" + "script" + ">",
        choice2: "<" + "js" + ">",
        choice3: "<" + "scripting" + ">",
        choice4: "<" + "javascript" + ">",
        answer: 1
    },
    {
        question: 'How do you write \"Hello World\" in an alert box?',
        choice1: 'alert(\"Hello World\");',
        choice2: 'alertBox(\"Hello World\");',
        choice3: 'msg(\"Hello World\");',
        choice4: 'msgBox(\"Hello World\");',
        answer: 1
    },
    {
        question: "How do you write an IF statement?",
        choice1: "if i = 5 then",
        choice2: "if i = 5",
        choice3: "if i==5 then",
        choice4: "if (i == 5)",
        answer: 4
    },
    {
        question: "How do you add a comment?",
        choice1: "```This is a comment",
        choice2: "// This is a comment",
        choice3: "<!-- This is a comment -->",
        choice4: "\\\\ This is a comment",
        answer: 2
    },
    {
        question: "What is the correct way to write an array?",
        choice1: "var colors = \“red\", \“green\”, \“blue\”;",
        choice2: "var colors = 1 = (\“red\”), 2 = (\“green\”), 3 = (\“blue\”);",
        choice3: "var colors = [\“red\”, \“green\”, \“blue\”];",
        choice4: "var colors = (\“red\”, \“green\”, \“blue\”);",
        answer: 3
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: "onmouseover",
        choice2: "onclick",
        choice3: "onchange",
        choice4: "onmouseclick",
        answer: 2
    },
    {
        question: "What will the following code return: Boolean(10 > 9)?",
        choice1: "True",
        choice2: "False",
        choice3: "Undefined",
        choice4: "NaN",
        answer: 1
    },
    {
        question: "How do you find the minimum of x and y?",
        choice1: "min(x, y)",
        choice2: "Math.min(x, y)",
        choice3: "Math.min(xy)",
        choice4: "min(xy)",
        answer: 2
    },
    {
        question: "If the value of x is 50, then what is the output of the following program? \n if (x % 10 == 0) {\n console.log(\“Divisible by 10\”); \n } else { \n console.log(\“Not divisible by 10\”); \n }",
        choice1: "ReferenceError",
        choice2: "Not divisible by 10",
        choice3: "Divisible by 10",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "How do you write an IF statement if i is NOT equal to 5?",
        choice1: "if i=! 5 then",
        choice2: "if (i<> 5)",
        choice3: "if ( i!= 5)",
        choice4: "if i<>5",
        answer: 3
    },
];

// Every correct answer is worth 10pts, there are 10 questions total
var pointValue = 10;
var totalQuestions = 10;

// function to start the game
function startGame() {
    // Question starts off at 0, the score is 0, and all questions are available
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // Invokes getNewQuestion function
    getNewQuestion();
    // Starts timer
    setTime();
}

// function to get new question
function getNewQuestion() {
    // If there are no more questions left, store the score, and go the the end page
    if (availableQuestions.length === 0 || questionCounter > totalQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.href="end.html";
    }
    // Increment question counter by 1
    questionCounter++;
    // Edits the question _ of 10 area
    progressText.innerText = `Question ${questionCounter} of ${totalQuestions}`;
    // For each correct answer, fill by 10 more %
    progressBarFull.style.width = `${(questionCounter / totalQuestions) * 100}%`;

    // Randomize questions
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    // Display in question id area
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

// Variable for the timer
var timeEl = document.querySelector("#time");

// How many seconds to take quiz
var secondsLeft = 60;

// Timer function
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " left in the quiz.";

        if (secondsLeft === 0) {
            // Stop execution
            clearInterval(timerInterval);
            // Go the end page
            return window.location.href="end.html";
        }
    }, 1000);
}


// For each choice text area on click...
choices.forEach(choice => {
    choice.addEventListener("click", selection => {
        // If not accepting answers, return
        if (!acceptingAnswers) {
            return;
        }
        acceptingAnswers = false;
        // Variable for specific answer clicked
        var selectedChoice = selection.target;
        // Variable to fetch data-number of selected choice
        var selectedAnswer = selectedChoice.dataset["number"];

        // Variable that will apply correct (green) or wrong (red) class to selected choice
        var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "wrong";

        // If the correct class is applied, increment score by value of correct answer (10pts)
        if (classToApply === "correct") {
            incrementScore(pointValue);
        }

        // Apply class to choice container
        selectedChoice.parentElement.classList.add(classToApply);

        // How long it will take to remove class and go to next questions
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 750)
    })
})

// variable that displays score in the correct area on page
var incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

// Invokes the startGame function
startGame();
