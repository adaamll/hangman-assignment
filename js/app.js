// GLOBAL VARIABLES
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const correctWordContainer = document.getElementById('word');
const wrongWordContainer = document.getElementById('no-match');
const infoContainer = document.getElementById('info');

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
}
generateRandomWord();

// FUNCTION TO RENDER UNDERSCORES/BOXES WITH THE SAME LENGTH AS RANDOM WORD
function generateUnderscores(word) {
  correctWordContainer.innerHTML = ``;

  for (let i = 0; i < word.length; i++) {
    correctWordContainer.innerHTML += `<li id="letter${i}"></li>`;
  }
}
generateUnderscores(chosenWord);

// EVENTLISTENER ON KEYPRESS TO SEE WHICH KEY IS PRESSED
document.addEventListener('keypress', (event) => {
  let pressedKey = String.fromCharCode(event.keyCode);
  checkGuess(pressedKey);
});

// FUNCTION TO CHECK IF GUESS IS CORRECT OR NOT
function checkGuess(guess) {
  if (chosenWord.includes(guess) && alphabet.includes(guess)) {
    for (let i = 0; i < chosenWord.length; i++) {
      const indexOfLetter = document.getElementById(`letter${i}`);
      if (chosenWord[i] === guess) {
        infoContainer.innerHTML = 'Great guess!';
        correctLetters.push(guess);
        indexOfLetter.textContent = guess;
        indexOfLetter.style.backgroundColor = '#66b07a';
        combineLetters();
      }
    }
  } else if (!chosenWord.includes(guess) && alphabet.includes(guess)) {
    if (!wrongLetters.includes(guess)) {
      infoContainer.innerHTML = 'Wrong guess!';
      wrongLetters.push(guess);
      wrongWordContainer.innerHTML = `<li>${wrongLetters.join(' ')}</li>`;
      wrongGuesses--;
      document.getElementById(
        'guesses'
      ).innerHTML = `Tries: ${wrongGuesses} left of 5`;
      renderSVG();
      endGame();
    }
  }
}

// FUNCTION TO COMBINE LETTERS FROM LI TO COMPARE TO CORRECT WORD
function combineLetters() {
  let listItems = correctWordContainer.getElementsByTagName('li');
  let comparedWord = '';
  for (let i = 0; i < listItems.length; i++) {
    comparedWord += listItems[i].innerHTML;
  }
  compareWords(comparedWord);
}

// FUNCTION TO COMPARE GUESSED WORD WITH CORRECT WORD
function compareWords(word) {
  if (word === chosenWord) {
    infoContainer.innerHTML = 'You win!';
    userScore++;
    document.getElementById('score').innerHTML = `Your score is: ${userScore}`;
    newGame();
  }
}

// FUNCTION TO RENDER SVG WHEN A WRONG GUESS HAS BEEN DONE
let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
function renderSVG() {
  document.querySelector('figure').classList.add(bodyParts[0]);
  bodyParts.shift();
  console.log(bodyParts);
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
  infoContainer.innerHTML = 'Next round!';

  setTimeout(() => {
    wrongGuesses = 5;
    correctLetters = [];
    wrongLetters = [];
    generateRandomWord();
    generateUnderscores(chosenWord);
    bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
    document
      .querySelector('figure')
      .classList.remove('scaffold', 'head', 'body', 'arms', 'legs');
    wrongWordContainer.textContent = '';
    infoContainer.innerHTML = 'Take a guess!';
  }, 2000);
}
