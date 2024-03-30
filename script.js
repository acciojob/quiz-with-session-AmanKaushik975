 const form = document.getElementById('quizForm');
    const submitButton = document.getElementById('submit');

    // Sample questions data
    const questions = [
      { question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], answer: 'Option 1' },
      { question: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], answer: 'Option 2' },
      // Add more questions as needed
    ];

    // Function to load the questions
    function loadQuestions() {
      questions.forEach((question, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p>${question.question}</p>
          ${question.options.map(option => `<input type="radio" name="question${index}" value="${option}">${option}<br>`).join('')}
        `;
        form.appendChild(div);
      });
    }

    // Function to save progress
    function saveProgress() {
      const inputs = Array.from(form.elements);
      inputs.forEach(input => {
        if (input.checked) sessionStorage.setItem(input.name, input.value);
      });
    }

    // Function to load progress
    function loadProgress() {
      const inputs = Array.from(form.elements);
      inputs.forEach(input => {
        if (sessionStorage.getItem(input.name) === input.value) input.checked = true;
      });
    }

    // Function to calculate score
    function calculateScore() {
      let score = 0;
      questions.forEach((question, index) => {
        const selectedOption = sessionStorage.getItem(`question${index}`);
        if (selectedOption === question.answer) score++;
      });
      return score;
    }

    // Load the questions and progress when the page loads
    window.onload = function() {
      loadQuestions();
      loadProgress();
    };

    // Save progress when an option is selected
    form.onchange = saveProgress;

    // Calculate score when the form is submitted
    submitButton.onclick = function() {
      const score = calculateScore();
      alert(`Your score is ${score} out of ${questions.length}.`);
      localStorage.setItem('score', score);
    };
  