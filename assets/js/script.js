let cards = document.querySelectorAll('.card');
let matchesRef = document.getElementById('matches');
let matches = 0;

let timerVariable = setInterval(updateTimer, 1000);
let timerRef = document.getElementById('timer')
let timeLeft = 10;

let cardFlipped = false;
let lockGame = false;
let firstCard, secondCard;

function updateTimer() {
    timeLeft--;
    timerRef.innerText = timeLeft;
}

function lost() {
    if (Number(timerRef.innerText === 1)) {
        console.log('stop')
    }
}

function flipCards() {
    if (lockGame) return;

    this.classList.toggle('flip')

    if (!cardFlipped) {
        // First card clicked 
        cardFlipped = true;
        firstCard = this;
    } else {
        // Second card clicked
        cardFlipped = false;
        secondCard = this;

        checkMatch()
    }
}

// To check for cards that match
function checkMatch() {
    if (firstCard.dataset.name ===
        secondCard.dataset.name) {

        firstCard.removeEventListener('click', flipCards)
        secondCard.removeEventListener('click', flipCards)

        // To update the number of matches by 1 for each pair.
        matches++;
        matchesRef.innerText = matches;


    } else {
        unflipCards();
    }

    // To alert the player they have won.

    if (Number(matchesRef.innerText) === 8) {
        setTimeout(() => {
            alert('You Won!!')
        }, 500);
    }

}

// To unflip the cards that don't match
function unflipCards() {
    lockGame = true;

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        lockGame = false;
    }, 1000);
}

// To randomize the placement of the cards
function shuffle() {
    cards.forEach(card => {
        let randomize = Math.floor(Math.random() * 16);
        card.style.order = randomize;
    })
};

// To reset the game by reloading the page
function init() {
    shuffle()
}

init();

document.getElementById("restart-btn").onclick = () => window.location.reload();

cards.forEach(card => card.addEventListener('click', flipCards))