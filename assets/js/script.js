/* jshint esversion: 8 */

// Tutorials adapted and added to for this project - https://www.youtube.com/watch?v=ZniVgo8U7ek , https://www.youtube.com/watch?v=-tlb4tv4mC4 
const cards = document.querySelectorAll('.card');
const gameWin = document.getElementById('won');
const gameLost = document.getElementById('lost');
const backBtn = document.getElementById('back');
const restartBtn = document.getElementById('restart-btn');
let matchesRef = document.getElementById('matches');
let matches = 0;
let timeLeft = 120;
let cardFlipped = false;
let lockGame = false;
let firstCard, secondCard;


// Code adapted for the timer function - https://www.codegrepper.com/code-examples/javascript/javascript+countdown+timer+minutes%2C+seconds

// Game countdown timer
let timerRef = setInterval(function () {
    if (timeLeft <= 0) {
        clearInterval(timerRef);
        lockGame = true;


        // To alert the player they have ran out of time.
        setTimeout(() => {
            gameLost.classList.remove('hide');
            backBtn.classList.add('hide');
            restartBtn.classList.add('hide');
        }, 500);


    }
    document.getElementById('timer').innerText = timeLeft;
    timeLeft--;
}, 1000);


// To flip game cards to reveal face
function flipCards() {
    if (lockGame) return;

    this.classList.toggle('flip');

    if (!cardFlipped) {
        // First card clicked 
        cardFlipped = true;
        firstCard = this;

        firstCard.removeEventListener('click', flipCards);

    } else {
        // Second card clicked
        cardFlipped = false;
        secondCard = this;

        checkMatch();
    }
}

// To check for cards that match
function checkMatch() {
    if (firstCard.dataset.name ===
        secondCard.dataset.name) {

        // To remove the abilty to flip card one twice
        firstCard.removeEventListener('click', flipCards);
        secondCard.removeEventListener('click', flipCards);

        // To update the number of matches by 1 for each pair.
        matches++;
        matchesRef.innerText = matches;


    } else {
        unflipCards();

        // To allow the clicked cards to be flipped again=
        firstCard.addEventListener('click', flipCards);
        secondCard.addEventListener('click', flipCards);
    }

    // To alert the player they have won.

    if (Number(matchesRef.innerText) === 8) {
        clearInterval(timerRef);

        lockGame = true;



        setTimeout(() => {
            gameWin.classList.remove('hide');
            backBtn.classList.add('hide');
            restartBtn.classList.add('hide');
        }, 500);
    }
}




// To unflip the cards that don't match
function unflipCards() {
    lockGame = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockGame = false;
    }, 1500);
}

// To randomize the placement of the cards
function shuffle() {
    cards.forEach(card => {
        let randomize = Math.floor(Math.random() * 16);
        card.style.order = randomize;
    });
}

// To reset the game by reloading the page
function init() {
    shuffle();
}

init();

document.getElementById("restart-btn").onclick = () => window.location.reload();
document.getElementById("play-btn1").onclick = () => window.location.reload();
document.getElementById("play-btn2").onclick = () => window.location.reload();

cards.forEach(card => card.addEventListener('click', flipCards));