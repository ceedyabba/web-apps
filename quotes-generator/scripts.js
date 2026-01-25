// Variables
let btn = document.querySelector('#new-quote');
let quote = document.querySelector('.quote');
let person = document.querySelector('.person');
let copyBtn = document.querySelector('#copy-quote');
let copyMsg = document.querySelector('#copy-msg');

// Data will come from JSON now
let quotes = [];

// Pool for "no repeats until all shown"
let pool = [];

// Build pool
function refillPool() {
  pool = quotes.map((_, i) => i);
}

// Get next index (no repeats until exhausted)
function getNextIndexNoRepeatUntilExhausted() {
  if (quotes.length === 0) return -1;

  if (pool.length === 0) refillPool();

  const pickPos = Math.floor(Math.random() * pool.length);
  const idx = pool[pickPos];
  pool.splice(pickPos, 1);

  return idx;
}

function showRandomQuote() {
  const idx = getNextIndexNoRepeatUntilExhausted();

  if (idx === -1) {
    quote.innerText = "No quotes available.";
    person.innerText = "";
    return;
  }

  quote.innerText = quotes[idx].quote;
  person.innerText = quotes[idx].person;
}

// Load quotes from JSON
async function loadQuotes() {
  try {
    const res = await fetch('quotes.json', { cache: 'no-store' });
    const data = await res.json();

    quotes = data;
    refillPool();
    showRandomQuote();
  } catch (err) {
    quote.innerText = "Failed to load quotes.";
    person.innerText = "";
    console.error(err);
  }
}

// Page load
loadQuotes();

// Next Quote button
btn.addEventListener('click', showRandomQuote);

// Copy button
copyBtn.addEventListener('click', async function () {
  const textToCopy = `${quote.innerText} — ${person.innerText}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyMsg.style.display = 'block';
    setTimeout(() => {
      copyMsg.style.display = 'none';
    }, 1000);
  } catch (err) {
    alert('Copy failed. Please copy manually.');
  }
});

// Keyboard support
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    showRandomQuote();
  }
});
