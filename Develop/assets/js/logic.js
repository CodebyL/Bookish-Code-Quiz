// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
 var startScreenEl = document.querySelector("#start-screen")
 startScreenEl.style.display = "none"
  // un-hide questions section
questionsEl.classList.remove("hide");
  // start timer
    // interval is set to call clockTick in every sec
    timer = setInterval(clockTick,1000);
  // show starting time

  getQuestion();
}

function getQuestion() {
  // get current question object from array
var CurrentQuestion = questions[currentQuestionIndex];
  // update title with current question
var TitleEl = document.getElementsById("question-title");
TitleEl.textContext = CurrentQuestion.title;
  // clear out any old question choices
  choicesEl.innerHTML=""
  // loop over choices
  CurrentQuestion.choices.ForEach(function(choice, i) {
    // create new button for each choice
    var ChoiceBtn = document.createElement("button");
    ChoiceBtn.setAttribute("class","choice");
    ChoiceBtn.setAttribute("value", choice);

    ChoiceBtn.textContent = i + 1 + ". " + choice;

    //attach click event listener to each choice
    ChoiceBtn.onclick = questionClick;
    //display on the page
    choicesEl.appendChild(ChoiceBtn);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 5;

    if (time<0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    // play "wrong" sound effect
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  // else 
  } else {
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.textContent = "Correct!"
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 5000);
  // move to next question
  currentQuestionIndex += 1
  // check if we've run out of questions
  if (currentQuestionIndex>questions.length-1) {
    // quizEnd
    quizEnd()
  // else 
  } else {
    // getQuestion
    getQuestion ()
  }
}


function quizEnd() {
  var UserScore = time.valueOf()
  document.getElementsById("final-score").textContent = UserScore
  // stop timer
  clearInterval(timerId)
  // hide questions section
  questionsEl.setAttribute("class", "hide");
  // show end screen
  endScreen.removeAttribute("class","hide")
  // show final score
  // save HighScore ()
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if(time <= 0) {
    clearInterval(timerId);
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var Initials = initialsEl.value.trime()
  // make sure value wasn't empty
  if (Initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var NewScore = {
      score: timerEl.textContent,
      Initials: Initials
    }
    //format new score object for current user
      // save to localstorage
      Scores.push(NewScore)
      localStorage.setItem("userScore", JSON.stringify(Scores));
    // redirect to next page
    }
    window.location.href = 'highscores.html';
    
  }


function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
