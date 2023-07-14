// Quiz questions and answers
var quizQuestions = [
  {
    question: "What is the file extension for JavaScript files?",
    choices: ["html", "css", "js"],
    answer: 2
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    choices: ["var", "let", "const"],
    answer: 0
  },
  {
    question: "Inside which HTML element do we put the JavaScript code?",
    choices: ["<script>", "<javascript>", "<js>"],
    answer: 0
  }
];

// Other variables
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerId;

// Elements
var startScreen = document.getElementById("start-screen");
var questionScreen = document.getElementById("question-screen");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var endScreen = document.getElementById("end-screen");
var finalScoreElement = document.getElementById("final-score");
var initialsElement = document.getElementById("initials");
var submitButton = document.getElementById("submit-btn");

// Function to start the quiz
function startQuiz() {
  startScreen.style.display = "none";
  questionScreen.style.display = "block";
  timerId = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
  showQuestion();
}

// Function to display the current question
function showQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = choice;
    button.setAttribute("data-index", i);
    button.addEventListener("click", checkAnswer);
    li.appendChild(button);
    choicesElement.appendChild(li);
  }
}

// Function to check the selected answer
function checkAnswer() {
  var selectedAnswerIndex = parseInt(this.getAttribute("data-index"));
  var currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedAnswerIndex === currentQuestion.answer) {
    // Correct answer
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    // Incorrect answer
    timeLeft -= 10; // Subtract 10 seconds from the timer
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerId);
  questionScreen.style.display = "none";
  endScreen.style.display = "block";
  finalScoreElement.textContent = timeLeft;
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
submitButton.addEventListener("click", function() {
  var initials = initialsElement.value.toUpperCase();
  // Store the initials and score as desired
  console.log("Initials:", initials);
  console.log("Score:", timeLeft);
});

