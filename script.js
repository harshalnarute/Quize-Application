// Frontend Developer Quiz Questions
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Modern Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false }
    ]
  },
  {
    question: "Which CSS property is used to change the text color?",
    answers: [
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-style", correct: false }
    ]
  },
  {
    question: "What is the correct way to create a function in JavaScript?",
    answers: [
      { text: "function = myFunction() {}", correct: false },
      { text: "function myFunction() {}", correct: true },
      { text: "create myFunction() {}", correct: false },
      { text: "def myFunction() {}", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used to link an external CSS file?",
    answers: [
      { text: "<style>", correct: false },
      { text: "<css>", correct: false },
      { text: "<link>", correct: true },
      { text: "<stylesheet>", correct: false }
    ]
  },
  {
    question: "What does 'responsive design' mean?",
    answers: [
      { text: "Design that responds to user clicks", correct: false },
      { text: "Design that adapts to different screen sizes", correct: true },
      { text: "Design with fast loading speed", correct: false },
      { text: "Design with animations", correct: false }
    ]
  },
  {
    question: "Which JavaScript method is used to select an element by ID?",
    answers: [
      { text: "getElementById()", correct: true },
      { text: "querySelector()", correct: false },
      { text: "getElementsByClassName()", correct: false },
      { text: "selectElement()", correct: false }
    ]
  },
  {
    question: "What is the box model in CSS?",
    answers: [
      { text: "A 3D modeling technique", correct: false },
      { text: "A layout model with margin, border, padding, and content", correct: true },
      { text: "A JavaScript framework", correct: false },
      { text: "A color scheme system", correct: false }
    ]
  },
  {
    question: "Which of these is NOT a valid CSS position value?",
    answers: [
      { text: "relative", correct: false },
      { text: "absolute", correct: false },
      { text: "fixed", correct: false },
      { text: "center", correct: true }
    ]
  },
  {
    question: "What does API stand for in web development?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Advanced Programming Integration", correct: false },
      { text: "Automated Process Interface", correct: false },
      { text: "Application Process Integration", correct: false }
    ]
  },
  {
    question: "Which CSS framework is known for its mobile-first approach?",
    answers: [
      { text: "Tailwind CSS", correct: false },
      { text: "Bootstrap", correct: true },
      { text: "Foundation", correct: false },
      { text: "Bulma", correct: false }
    ]
  }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// DOM elements
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');

// Initialize quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hidden');
  showQuestion(questions[currentQuestionIndex]);
  updateProgress();
}

// Display current question
function showQuestion(question) {
  // Clear previous content
  questionContainer.innerHTML = '';
  answerButtons.innerHTML = '';
  
  // Create question element
  const questionElement = document.createElement('div');
  questionElement.classList.add('question-text');
  questionElement.textContent = question.question;
  questionContainer.appendChild(questionElement);
  
  // Create answer buttons
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'answer-btn');
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer.text}`;
    button.dataset.correct = answer.correct;
    button.addEventListener('click', () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(selectedButton, isCorrect) {
  // Disable all buttons
  const allButtons = answerButtons.querySelectorAll('.btn');
  allButtons.forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else if (button === selectedButton && !isCorrect) {
      button.classList.add('incorrect');
    }
  });
  
  // Update score
  if (isCorrect) {
    score++;
  }
  
  // Show next button
  nextButton.classList.remove('hidden');
  nextButton.style.visibility = 'visible';
  nextButton.style.pointerEvents = 'auto';
}

// Update progress
function updateProgress() {
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Handle next button click
function handleNextButton() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    updateProgress();
    nextButton.classList.add('hidden');
    nextButton.style.visibility = 'hidden';
    nextButton.style.pointerEvents = 'none';
  } else {
    showScore();
  }
}

// Display final score
function showScore() {
  // Clear content
  questionContainer.innerHTML = '';
  answerButtons.innerHTML = '';
  
  // Calculate percentage
  const percentage = Math.round((score / questions.length) * 100);
  
  // Create score display
  const scoreElement = document.createElement('div');
  scoreElement.classList.add('score-container');
  scoreElement.innerHTML = `
    <h2>Quiz Complete!</h2>
    <div class="score-circle">
      <span class="score-text">${score}/${questions.length}</span>
      <span class="score-percentage">${percentage}%</span>
    </div>
    <p class="score-message">${getScoreMessage(percentage)}</p>
    <button class="btn restart-btn" onclick="restartQuiz()">Try Again</button>
  `;
  
  questionContainer.appendChild(scoreElement);
  nextButton.classList.add('hidden');
  progressElement.textContent = 'Quiz Complete';
}

// Get score message based on percentage
function getScoreMessage(percentage) {
  if (percentage >= 90) return "Excellent! You're a frontend master! 🏆";
  if (percentage >= 70) return "Great job! You know your stuff! 👏";
  if (percentage >= 50) return "Good effort! Keep learning! 📚";
  return "Keep practicing! You'll get there! 💪";
}

// Restart quiz
function restartQuiz() {
  startQuiz();
}

// Event listeners
nextButton.addEventListener('click', handleNextButton);

// Start the quiz when page loads
document.addEventListener('DOMContentLoaded', startQuiz);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
    const index = parseInt(e.key) - 1;
    const buttons = answerButtons.querySelectorAll('.btn:not([disabled])');
    if (buttons[index]) {
      buttons[index].click();
    }
  } else if (e.key === 'Enter' && !nextButton.classList.contains('hidden')) {
    nextButton.click();
  }
});
