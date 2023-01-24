// GLOBAL VARIABLES

const correctWordContainer = document.getElementById('word');

let userScore = 0;
let correctLetters = [];
let wrongLetters = [];
let totalGuesses = 0;
let wrongGuesses = 5;
let chosenWord = '';

const words = ['monkey', 'banana', 'tree', 'jungle', 'snek'];

// FUNCTION TO GENERATE RANDOM WORD
function generateRandomWord() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  console.log(chosenWord);
}
generateRandomWord();

// FUNCTION TO RENDER UNDERSCORES
function generateUnderscores(word) {
  correctWordContainer.innerHTML = ``;

  for (let i = 0; i < word.length; i++) {
    correctWordContainer.innerHTML += `<li id="letter${i}"></li>`;
  }
}
generateUnderscores(chosenWord);

// EVENTLISTENER ON KEYPRESS
document.addEventListener('keypress', (event) => {
  let pressedKey = String.fromCharCode(event.keyCode);
});
