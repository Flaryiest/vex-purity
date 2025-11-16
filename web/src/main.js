import './style.css'
import { questions } from './questions.js'

let checkedCount = 0;

function getInterpretation(score) {
  if (score >= 95) return "VEX Newbie - You're just getting started!";
  if (score >= 85) return "Casual Competitor - You know the basics.";
  if (score >= 70) return "Dedicated Builder - VEX is life!";
  if (score >= 50) return "VEX Veteran - You've seen some things...";
  if (score >= 30) return "Robotics Degenerate - Touch grass maybe?";
  if (score >= 15) return "Basement Dweller - Your robot is your best friend.";
  return "Peak VEX Experience - You need help (professionally).";
}

function updateScore() {
  // Score is only shown after calculate button is pressed
}

function renderQuestions() {
  const questionsList = questions.map((question, index) => `
    <li>
      <label class="question-item" data-index="${index}">
        <input type="checkbox" id="q${index}" data-index="${index}">
        <span class="question-text">${question}</span>
      </label>
    </li>
  `).join('');

  return `
    <div class="container">
      <header>
        <h1>VEX Purity Test</h1>
        <p class="subtitle">The Innocent VEX Robotics Competitor Test</p>
      </header>

      <div class="instructions">
        <strong>Instructions:</strong> Check each item you have done. Your purity score will decrease with each checked item. 
        The lower your score, the more "experienced" you are in the world of VEX Robotics.
      </div>

      <ul class="questions-list" id="questionsList">
        ${questionsList}
      </ul>

      <div class="button-group">
        <button id="resetBtn" class="secondary">Reset All</button>
        <button id="calculateBtn">Calculate Final Score</button>
      </div>

      <div id="resultSection" class="result-section hidden">
        <div class="score-display">
          <div>Your VEX Purity Score:</div>
          <span class="score-number" id="finalScore">100</span>
          <div id="finalInterpretation">Pure and Innocent VEX Competitor</div>
        </div>
      </div>
    </div>
  `;
}

function initializeApp() {
  document.querySelector('#app').innerHTML = renderQuestions();

  // Add event listeners to checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const item = e.target.closest('.question-item');
      if (e.target.checked) {
        checkedCount++;
        item.classList.add('checked');
      } else {
        checkedCount--;
        item.classList.remove('checked');
      }
    });
  });

  // Reset button
  document.getElementById('resetBtn').addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.closest('.question-item').classList.remove('checked');
    });
    checkedCount = 0;
    document.getElementById('resultSection').classList.add('hidden');
  });

  // Calculate button
  document.getElementById('calculateBtn').addEventListener('click', () => {
    const score = Math.round(((questions.length - checkedCount) / questions.length) * 100);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalInterpretation').textContent = getInterpretation(score);
    document.getElementById('resultSection').classList.remove('hidden');
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

initializeApp();
