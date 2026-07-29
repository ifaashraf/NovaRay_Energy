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

// --- Solar savings calculator (driven by data/savings.js) ---
// The slider moves across an index into SAVINGS_TABLE rather than raw kW,
// since system sizes jump non-linearly at the commercial/industrial tier
// (3-20 kW step 1, then 30, 40, 50 ... 1000 kW).
const slider = document.getElementById('sizeSlider');
const sizeOutput = document.getElementById('sizeOutput');
const tierBadge = document.getElementById('tierBadge');
const tierNote = document.getElementById('tierNote');
const yearlyEl = document.getElementById('yearlySavings');
const lifetimeEl = document.getElementById('lifetimeSavings');

const COMMERCIAL_NOTE = "⚠️ For 30 kW and above (commercial/industrial), figures are rough estimates for marketing purposes only — actual savings depend heavily on the customer's electricity tariff and usage pattern.";

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

slider.max = SAVINGS_TABLE.length - 1;

function updateCalculator() {
  const row = SAVINGS_TABLE[Number(slider.value)];

  sizeOutput.textContent = `${row.kw} kW`;
  yearlyEl.textContent = `${formatINR(row.min)} – ${formatINR(row.max)}`;
  lifetimeEl.textContent = `${formatINR(row.min * 20)} – ${formatINR(row.max * 20)}`;

  if (row.tier === 'commercial') {
    tierBadge.textContent = '🏢 Commercial/Industrial';
    tierNote.textContent = COMMERCIAL_NOTE;
  } else {
    tierBadge.textContent = '🏠 Residential';
    tierNote.textContent = '';
  }
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
