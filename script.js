"use strict";

// Seleceting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let score0El = document.querySelector("#score--0");
let score1El = document.getElementById("score--1"); //Another way to select element
let current0El = document.getElementById("current--0");
let current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// functions
const switching = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

// Starting conditions
diceEl.classList.add("hidden");
let playing = true;

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
            // Add dice to the current number
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

        if (x < 15) {
            // set current-score 0
            // current0El.textContent = 0;
            // current1El.textContent = 0;

            // change the player
            switching();

            // currentScore = 0;
        } else {
            playing = false;
            diceEl.classList.add("hidden");
            console.log("YOU WON MF!");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
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
