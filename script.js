'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
let currentPlayer = 'player1';
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let player1Total = 0;
let player2Total = 0;

const setPlayer1CurrentScore = function() {
    document.getElementById('current--0').textContent = player1CurrentScore;
}
const setPlayer2CurrentScore = function() {
    document.querySelector('#current--1').textContent = player2CurrentScore;
}

const setPlayer1TotalScore = function() {
    document.getElementById('score--0').textContent = player1Total;
}
const setPlayer2TotalScore = function() {
    document.querySelector('#score--1').textContent = player2Total;
}

// Starting Conditions
setPlayer1TotalScore();
setPlayer2TotalScore();
diceImg.classList.add('hidden');

const randomDiceRoll = () => Math.trunc(Math.random() * 6) + 1;

btnRoll.addEventListener('click', function() {
    if (player1Total < 100 && player2Total < 100) {
        let randomDice = randomDiceRoll();
        let imgSrc = `dice-${randomDice}.png`;
        diceImg.setAttribute('src', imgSrc);
        diceImg.classList.remove('hidden');
        if (randomDice === 1) {
            if (currentPlayer === 'player1') {
                player1CurrentScore = 0;
                setPlayer1CurrentScore();
                player1.classList.remove('player--active');
                player2.classList.add('player--active');
            } else {
                player2CurrentScore = 0;
                setPlayer2CurrentScore();
                player2.classList.remove('player--active');
                player1.classList.add('player--active');
            }
            currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1'

        } else {
            if (currentPlayer === 'player1') {
                player1CurrentScore += randomDice;
                setPlayer1CurrentScore();
            } else {
                player2CurrentScore += randomDice;
                setPlayer2CurrentScore();
            }
        }
    }
});

btnHold.addEventListener('click', function() {
    if (player1Total < 100 && player2Total < 100) {
        if (currentPlayer === 'player1') {
            player1Total += player1CurrentScore;
            setPlayer1TotalScore();
            player1CurrentScore = 0;
            setPlayer1CurrentScore();
            if (player1Total >= 100) {
                player1.classList.add('player--winner');
                diceImg.classList.add('hidden');
            } else {
                player1.classList.remove('player--active');
                player2.classList.add('player--active');
            }
        } else {
            player2Total += player2CurrentScore;
            setPlayer2TotalScore();
            player2CurrentScore = 0;
            setPlayer2CurrentScore();
            if (player2Total >= 100) {
                player2.classList.add('player--winner');
                diceImg.classList.add('hidden');
            } else {
                player2.classList.remove('player--active');
                player1.classList.add('player--active');
            }
        }
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    }
});

btnNewGame.addEventListener('click', function() {
    currentPlayer = 'player1';
    player1CurrentScore = 0;
    setPlayer1CurrentScore();
    player2CurrentScore = 0;
    setPlayer2CurrentScore();
    player1Total = 0;
    setPlayer1TotalScore();
    player2Total = 0;
    setPlayer2TotalScore();
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
})