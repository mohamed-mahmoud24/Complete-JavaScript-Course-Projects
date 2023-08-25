'use strict';

const player0el = document.querySelector('.player0');
const player1el = document.querySelector('.player1');
const score0 = document.querySelector('#score0');
const score1 = document.querySelector('#score1');
const current0El = document.querySelector('#current0');
const current1El = document.querySelector('#current1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btnNew');
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');

let score, currentScore, activePlayer, playing;

const startingTheGame = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

const switchPlayer = function () {
  currentScore = document.querySelector(
    `#current${activePlayer}`
  ).textContent = 0;
  document
    .querySelector(`.player${activePlayer}`)
    .classList.remove('playeractive');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player${activePlayer}`)
    .classList.add('playeractive');
};

startingTheGame();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    if (score[activePlayer] < 100) {
      document.querySelector(`#score${activePlayer}`).textContent =
        score[activePlayer];
      switchPlayer();
    } else {
      document.querySelector(`#score${activePlayer}`).textContent =
        score[activePlayer];
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('playerwinner');
      setTimeout(function () {
        alert(
          `congratulations ${
            document.querySelector(`#name${activePlayer}`).textContent
          } you won the game`
        );
      }, 500);
      playing = false;
    }
  }
});

btnNew.addEventListener('click', function () {
  startingTheGame();
  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0el.classList.remove('playerwinner');
  player1el.classList.remove('playerwinner');
  player0el.classList.add('playeractive');
  player1el.classList.remove('playeractive');
});
