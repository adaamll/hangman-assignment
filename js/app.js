// GLOBAL VARIABLES

const correctWordContainer = document.getElementById('word');
const wrongWordContainer = document.getElementById('no-match');

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
  checkGuess(pressedKey);
});

// FUNCTION TO CHECK IF GUESS IS CORRECT

function checkGuess(guess) {
  if (chosenWord.includes(guess)) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === guess) {
        correctLetters.push(guess);
        document.getElementById(`letter${i}`).textContent = guess;
        combineLetters();
      }
    }
  } else if (!chosenWord.includes(guess)) {
    if (!wrongLetters.includes(guess)) {
      wrongLetters.push(guess);
      wrongWordContainer.innerHTML = `<li>${wrongLetters.join(' ')}</li>`;
      wrongGuesses--;
      renderSVG();
      endGame();
    }
  }
}

// FUNCTION TO COMBINE LETTERS
function combineLetters() {
  let listItems = correctWordContainer.getElementsByTagName('li');
  let comparedWord = '';
  for (let i = 0; i < listItems.length; i++) {
    comparedWord += listItems[i].innerHTML;
  }
  compareWords(comparedWord);
}

// FUNCTION TO COMPARE WORDS
function compareWords(word) {
  if (word === chosenWord) {
    document.getElementById('info').innerHTML = 'You win!';
    userScore++;
  }
}

// FUNCTION TO RENDER SVG
let bodyParts = ['scaffold', 'head', 'body', 'arms', 'legs'];
function renderSVG() {
  document.querySelector('figure').classList.add(bodyParts[0]);
  bodyParts.shift();
  console.log(bodyParts);
}

// FUNCTION END GAME
function endGame() {
  if (wrongGuesses === 0) {
    document.querySelector('b').textContent = `${chosenWord}`;
    document.querySelector('.game-over').classList.add('show');
  }
}

// EVENTLISTENER RESTART BUTTON
document.querySelector('a').addEventListener('click', () => {
  location.reload();
});
