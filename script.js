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

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = `Time: ${secondsLeft}`;
        
        if(secondsLeft === 0 || currentQuestionIndex===myQuestions.length || secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
        
    }, 1000);
   
}


function quizResults() { //function that shows the results and stores it in the local storage
    questionEL.innerHTML = " ";
    choicesEl.innerHTML = ' ';
    header1El.innerHTML = "All Done!";
    choicesEl.innerHTML = "Enter your initials: ";
    finalScore.textContent = `Your score is: ${score}`;
    timeEl.classList.add("d-none");
    feedbackEl.classList.add("d-none");
    finalIDEl.classList.remove("d-none");
    finalScore.classList.remove("d-none");
    storeBtnEl.classList.remove("d-none");
}

function storeResults() {
    console.log('started')
    localStorage.setItem(finalIDEl.value, score);
    reStartBtnEL.classList.remove("d-none");
    var scoresMessage = document.createElement("div");
    scoresMessage.innerText = `Results stored! Please view High Scores or refresh the page to start over.`;
    scoresFeedbackEl.prepend(scoresMessage);
}






startBtnEL.addEventListener("click", startQuiz);
storeBtnEl.addEventListener("click", storeResults);
highScoresEl.addEventListener("click", renderResults);
reStartBtnEL.addEventListener("click", refresh);