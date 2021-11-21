'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1')

let totalScore, activePlayer, currentScore, playing;

const init = function() {
    playing = true;
    totalScore = [0, 0];
    activePlayer = 0;
    currentScore = 0;

    current0.textContent = 0;
    current1.textContent = 0;
    score0.textContent = totalScore[0];
    score1.textContent = totalScore[1];

    diceImg.classList.add('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
}

init();

const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
}

const randomDiceRoll = () => Math.trunc(Math.random() * 6) + 1;

btnRoll.addEventListener('click', function() {
    if (totalScore[0] < 100 && totalScore[1] < 100) {
        let randomDice = randomDiceRoll();
        let imgSrc = `dice-${randomDice}.png`;
        diceImg.src = imgSrc;
        diceImg.classList.remove('hidden');
        if (randomDice === 1) {
            switchPlayer();
            player1.classList.toggle('player--active');
            player2.classList.toggle('player--active');
        } else {
            currentScore += randomDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active player's score
        totalScore[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScore[activePlayer];
        // 2. Check if player's score is >= 100 
        if (totalScore[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch to the next player
            switchPlayer();
        }
    }
});

btnNewGame.addEventListener('click', init);