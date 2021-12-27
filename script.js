var header1El = document.getElementById("header1");
var contentEl = document.getElementById("content");
var startBtnEL = document.getElementById("startBtn");
var reStartBtnEL = document.getElementById("reStartBtn");
var storeBtnEl = document.getElementById("storeBtn");
var questionEL = document.getElementById("main");
var timeEl = document.querySelector("#time");
var feedbackEl = document.getElementById("feedback");
var choicesEl = document.getElementById("choices");
var finalIDEl = document.getElementById("finalID");
var finalScore = document.getElementById("finalScore");
var scoresFeedbackEl = document.getElementById("scoresFeedback");
var resultsEl = document.getElementById("results");
var highScoresEl = document.getElementById("highScores");
var score = 0;
var secondsLeft = 15*myQuestions.length;
var currentQuestionIndex = 0;
var currentQuestion = myQuestions[currentQuestionIndex];

// first fucntion -- start quiz

function startQuiz () {
    header1El.innerHTML = " ";
    resultsEl.innerHTML = " ";
    startBtnEL = document.getElementById("startBtn");
    startBtnEL.classList.add("d-none"); //hides the start button - works well
    getChoices();
    setTime(); 
}

function getChoices(){
    var currentQuestion =myQuestions[currentQuestionIndex];
    var titleEL = document.getElementById("main");
    titleEL.textContent =currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach( function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "btn btn-success");
        choiceButton.setAttribute("id","qzBtn");
        choiceButton.setAttribute("value", i);
        choiceButton.textContent = i + 1 +". " + choice;
        choiceButton.onclick = questionClick;
        choicesEl.appendChild(choiceButton);

    }
    )

}

function questionClick () {
    if (this.value != myQuestions[currentQuestionIndex].correctAnswer) {
        secondsLeft -= 10;
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
        
        timeEl.textContent = time;
        feedbackEl.innerHTML = "<br>"
        feedbackEl.textContent = "Incorrect";
    } else { //if correct
        feedbackEl.textContent = "Correct";
        score++;
        // console.log(score); score works
    }
    currentQuestionIndex++;
    if (currentQuestionIndex===myQuestions.length || secondsLeft <= 0) {
        quizResults();
        return;
    }
    getChoices();
}