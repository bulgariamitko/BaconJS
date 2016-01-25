// define elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  moneyContainer = $("money"),
  submitBtn = $("submit");

// init vars
var currentQuestion = 0,
  money = 0,
  answerStatus = true;

function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";

  // loop through choices, and create radio buttons
  for (var i = 0; i < choices.length; i++) {

    if (i >= 1 & i<2) {
      choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
    } else {
      choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label>"+
      "   ";
    }
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
    moneyContainer.textContent = "Money: 0 ";
    submitBtn.textContent = "Submit Answer";
  }
}
var pickedAnswer;
function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (answerStatus) {

    // determine which button is clicked 
    var userpick,
      correctIndex,
      buttons = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].checked) { // if this radio button is checked
        userpick = buttons[i].value;
      }

      // get index of correct answer
      if (buttons[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
        answerStatus=false;
      }
    }

    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      money += parseInt(quiz[currentQuestion].money);
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }
    moneyContainer.textContent = "Money: " + money;
    pickedAnswer = userpick;
  }else { 
    answerStatus = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    if (pickedAnswer == quiz[currentQuestion].correct) { // move to next question
      if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        askQuestion();
      }else{
        allAnswersCorrect();
      }
    }else {
      wrongAnswerResult();
    }
  }
}


function wrongAnswerResult() {
  content.innerHTML = "<h2>You answered wrong</h2>" +
    "<h2>You won: " +money +" $ </h2>" ;
}

function allAnswersCorrect(){
  content.innerHTML = "<h2>Congratulations you've beat the Game!</h2>" +
    "<h2>You won: " +money +" $ </h2>" ;
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
