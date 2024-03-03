const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const userAnswers = [];

// Load user answers from session storage
for (let i = 0; i < questions.length; i++) {
  const storedAnswer = sessionStorage.getItem(`question-${i}`);
  if (storedAnswer) {
    userAnswers[i] = storedAnswer;
  }
}

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choiceElement.value;
        sessionStorage.setItem(`question-${i}`, choiceElement.value);
      });
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  localStorage.setItem("score", score);
  return score;
}

submitButton.addEventListener("click", () => {
  const score = calculateScore();
  alert(`Your score is ${score} out of ${questions.length}.`);
});

renderQuestions();
