document.getElementById('year').textContent = new Date().getFullYear();

// --- Day / Night theme toggle ---
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle.querySelector('.toggle-icon');
const toggleLabel = themeToggle.querySelector('.toggle-label');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'night') {
    toggleIcon.textContent = '🌙';
    toggleLabel.textContent = 'Night Mode';
  } else {
    toggleIcon.textContent = '☀️';
    toggleLabel.textContent = 'Day Mode';
  }
  localStorage.setItem('novaray-theme', theme);
}

const savedTheme = localStorage.getItem('novaray-theme') || 'day';
applyTheme(savedTheme);

themeToggle.addEventListener('click', function () {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'night' ? 'day' : 'night');
});

// --- Solar bill calculator ---
const slider = document.getElementById('billSlider');
const billOutput = document.getElementById('billOutput');
const yearlyEl = document.getElementById('yearlySavings');
const lifetimeEl = document.getElementById('lifetimeSavings');
const funFactEl = document.getElementById('funFact');

const SAVINGS_RATE = 0.65; // playful estimate: solar offsets ~65% of your bill

function funFact(yearly) {
  if (yearly < 8000) return "That's a nice dinner out every month! 🍽️";
  if (yearly < 20000) return "That's enough for a getaway to the hills every year! 🏞️";
  if (yearly < 40000) return "That's a new phone AND a vacation! 📱✈️";
  return "That's practically a second paycheck! 💸";
}

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function updateCalculator() {
  const bill = Number(slider.value);
  const yearly = Math.round(bill * 12 * SAVINGS_RATE);
  const lifetime = yearly * 20;

  billOutput.textContent = formatINR(bill);
  yearlyEl.textContent = formatINR(yearly);
  lifetimeEl.textContent = formatINR(lifetime);
  funFactEl.textContent = funFact(yearly);
}

slider.addEventListener('input', updateCalculator);
updateCalculator();

// --- Notify form ---
document.getElementById('notifyForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = "Thanks — we'll let you know when we launch!";
  document.getElementById('email').value = '';
});
