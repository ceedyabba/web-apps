//Variables

let btn = document.querySelector('#new-quote');
let quote = document.querySelector('.quote');
let person = document.querySelector('.person');
let copyBtn = document.querySelector('#copy-quote');
let copyMsg = document.querySelector('#copy-msg');


const quotes = [{
    quote: '"The strongest among you is the one who controls his anger"',
    person: 'Abu Hurairah'
}, {
    quote: '"Kindness is a mark of faith"', 
    person: 'Aishatu bnt Aba Bakr'
}, {
    quote: '"Say the truth even if it may be bitter."',
    person: 'Abu Dharr al-Ghifari'
}, {
    quote: '"None of you [truly] believes until he loves for his brother what he loves for himself."', 
    person: 'Anas bn Malik'
}, {
    quote: '"The best among you are those who have the best manners and character."',
    person: 'Abdullahi bn Amr'
}]

// Track last shown index
let lastIndex = -1;

function getRandomIndexNoRepeat(length) {
  if (length <= 1) return 0;

  let idx = Math.floor(Math.random() * length);
  while (idx === lastIndex) {
    idx = Math.floor(Math.random() * length);
  }
  return idx;
}

function showRandomQuote() {
  const idx = getRandomIndexNoRepeat(quotes.length);
  lastIndex = idx;

  quote.innerText = quotes[idx].quote;
  person.innerText = quotes[idx].person;
}

// Generate first quote on page load
showRandomQuote();

// Next Quote button
btn.addEventListener('click', showRandomQuote);

copyBtn.addEventListener('click', async function () {
  const textToCopy = `${quote.innerText} — ${person.innerText}`;

  try {
    await navigator.clipboard.writeText(textToCopy);

    // show "Copied!" briefly
    copyMsg.style.display = 'block';
    setTimeout(() => {
      copyMsg.style.display = 'none';
    }, 1000);

  } catch (err) {
    alert('Copy failed. Please copy manually.');
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // Prevent Enter from doing other default actions (useful if you later add inputs)
    event.preventDefault();
    showRandomQuote();
  }
});

