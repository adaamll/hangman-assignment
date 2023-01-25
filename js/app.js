// GLOBAL VARIABLES
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const correctWordContainer = document.querySelector('.word');
const wrongWordContainer = document.querySelector('.nomatch');
const infoContainer = document.querySelector('.info');

let isWaiting = false; // BOOLEAN TO DISABLE KEYPRESS WHILE WAITING FOR NEW WORD

let userScore = 0;
let correctLetters = [];
let wrongLetters = [];
let wrongGuesses = 5;
let chosenWord = '';

const words = ['monkey', 'banana', 'tree', 'jungle', 'snake'];

// FUNCTION TO GENERATE RANDOM WORD FROM THE LIST OF WORDS
function generateRandomWord() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  console.log(chosenWord);
  generateUnderscores(chosenWord);
}
generateRandomWord();

// FUNCTION TO RENDER UNDERSCORES/BOXES WITH THE SAME LENGTH AS RANDOM WORD
function generateUnderscores(word) {
  correctWordContainer.innerHTML = ``;

  for (let i = 0; i < word.length; i++) {
    correctWordContainer.innerHTML += `<li id="letter${i}"></li>`;
  }
}

// EVENTLISTENER ON KEYPRESS TO SEE WHICH KEY IS PRESSED
document.addEventListener('keypress', (event) => {
  if (!isWaiting) {
    let pressedKey = event.key;
    checkGuess(pressedKey);
  }
});

// FUNCTION TO CHECK IF GUESS IS CORRECT OR NOT
function checkGuess(guess) {
  if (isCorrectGuess(guess) && isValidGuess(guess)) {
    updateCorrectGuess(guess);
  } else if (!isCorrectGuess(guess) && isValidGuess(guess)) {
    updateWrongGuess(guess);
  }
}

// FUNCTION TO CHECK IF GUESS IS A CORRECT GUESS
function isCorrectGuess(guess) {
  return chosenWord.includes(guess);
}

// FUNCTION TO CHECK IF GUESS IS A VALID GUESS
function isValidGuess(guess) {
  return alphabet.includes(guess);
}

// FUNCTION TO UPDATE UI FOR CORRECT GUESS
function updateCorrectGuess(guess) {
  for (let i = 0; i < chosenWord.length; i++) {
    const letterEl = document.getElementById(`letter${i}`);
    if (chosenWord[i] === guess) {
      correctLetters.push(guess);
      letterEl.textContent = guess;
      infoContainer.textContent = 'Great guess!';
      letterEl.setAttribute('style', 'background-color: #66b07a;');
      combineLetters();
    }
  }
}

// FUNCTION TO UPDATE UI FOR WRONG GUESS
function updateWrongGuess(guess) {
  if (!wrongLetters.includes(guess)) {
    wrongLetters.push(guess);
    wrongGuesses--;
    infoContainer.textContent = 'Wrong guess!';
    wrongWordContainer.innerHTML = `<li>${wrongLetters.join(' ')}</li>`;
    document.getElementById('guesses').textContent = `${wrongGuesses}`;
    renderSVG();
    endGame();
  }
}

// FUNCTION TO COMBINE LETTERS FROM LI TO COMPARE TO CORRECT WORD
function combineLetters() {
  let listItems = document.querySelectorAll('.word li');
  let comparedWord = '';
  for (let i = 0; i < listItems.length; i++) {
    comparedWord += listItems[i].innerHTML;
  }
  compareWords(comparedWord);
}

// FUNCTION TO COMPARE GUESSED WORD WITH CORRECT WORD
function compareWords(word) {
  if (word === chosenWord) {
    isWaiting = true; // FLIP BOOLEAN SO THAT YOU CANT TYPE UNTIL NEW WORD RENDERS
    userScore += 10;
    document.getElementById('score').textContent = `${userScore}`;
    newGame();
  }
}

// FUNCTION TO RENDER SVG WHEN A WRONG GUESS HAS BEEN DONE
let i = 0;
function renderSVG() {
  let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
  document.querySelector('figure').classList.add(bodyParts[i]);
  i++;
}

// FUNCTION TO DISPLAY GAME OVER OVERLAY IF USER FAILED TO GUESS THE WORD
function endGame() {
  if (wrongGuesses === 0) {
    document.querySelector('b').textContent = `${chosenWord}`;
    document.querySelector('.game-over').classList.add('show');
  }
}

// EVENTLISTENER ON RESTART BUTTON TO RELOAD THE GAME
document.querySelector('a').addEventListener('click', () => {
  location.reload();
});

// FUNCTION TO RENDER NEW WORD IF THE PREVIOUS WORD IS GUESSED CORRECTLY
function newGame() {
  infoContainer.textContent = 'You win! Next round!';

  setTimeout(() => {
    i = 0; // RESET INDEX FOR ADDING CLASSES ON SVG
    isWaiting = false; // FLIP BOOLEAN TO ENABLE TYPING AGAIN
    wrongGuesses = 5;
    correctLetters = [];
    wrongLetters = [];
    generateRandomWord();
    generateUnderscores(chosenWord);
    wrongWordContainer.textContent = '';
    infoContainer.textContent = 'Take a guess!';
    document.querySelector('figure').className = ''; // RESET ADDED CLASSES ON SVG
    document.getElementById('guesses').textContent = `${wrongGuesses}`;
  }, 2000);
}
