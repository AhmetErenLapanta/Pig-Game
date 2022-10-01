"use strict";

// Seleceting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let score0El = document.getElementById("score--0");
let score1El = document.getElementById("score--1");

let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// initializers
let currentScore = 0;
let activePlayer = 0;
let playing = true;
diceEl.classList.add("hidden");

// Switch Funtion
const switching = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

// Event Listeners

btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generating a random dice number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Display dice to the viewport
        diceEl.classList.remove("hidden");
        diceEl.src = `img/dice-${dice}.png`;

        // 3. Check if its 1 and if so switch to the next player
        if (dice !== 1) {
            // Adding dice to the current number
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // switch to next player
            switching();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        // add the current score of the active to the score of the active
        let y = parseInt(
            document.getElementById(`current--${activePlayer}`).textContent
        );
        let x = parseInt(
            document.querySelector(`#score--${activePlayer}`).textContent
        );
        x += y;
        document.querySelector(`#score--${activePlayer}`).textContent = x;

        if (x < 50) {
            switching();
        } else {
            playing = false;

            diceEl.classList.add("hidden");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");

            document.getElementById(`current--${activePlayer}`).textContent =
                "You Won 🎉";
        }
    }
});

btnNew.addEventListener("click", function () {
    // resetting all the initial conditions
    playing = true;
    diceEl.classList.remove("hidden");
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--winner");
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    // current-score score
    currentScore = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
});
