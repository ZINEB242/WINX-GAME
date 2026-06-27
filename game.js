let canPlay = false;

// Afficher le prénom
const player = localStorage.getItem("prenom") || "Joueur";
document.getElementById("welcome").textContent = "Bonjour " + player + " 💖";

// Images des cartes
const cards = [
  "winx/bloom.jpg",
  "winx/stella.jpg",
  "winx/flora.jpg",
  "winx/musa.jpg",
  "winx/techna.jpg",
  "winx/layla.png",
  "winx/roxy.jpg",
  "winx/daphne.png",
];

// Doubler les cartes
let gameCards = [...cards, ...cards];

// Mélanger
gameCards.sort(() => Math.random() - 0.5);

const board = document.getElementById("gameBoard");

let firstCard = null;
let secondCard = null;
let lock = false;

let moves = 0;
let pairs = 0;

// Créer les cartes
gameCards.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("memory-card");

  card.dataset.image = image;

  // au début on cache tout
  card.innerHTML = `<img src="${image}">`;

  board.appendChild(card);

  card.addEventListener("click", flipCard);
});

// Après 3 secondes → cacher les cartes
setTimeout(() => {
  const allCards = document.querySelectorAll(".memory-card");

  allCards.forEach(card => {
    card.innerHTML = `<img src="winx/back.jpg">`;
  });

  canPlay = true;
}, 3000);

// Retourner une carte
function flipCard() {
  if (!canPlay) return;
  if (lock) return;
  if (this === firstCard) return;

  this.innerHTML = `<img src="${this.dataset.image}">`;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lock = true;

  moves++;
  document.getElementById("moves").textContent = moves;

  checkMatch();
}

// Vérifier match
function checkMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {

    pairs++;
    document.getElementById("pairs").textContent = pairs;

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetTurn();

    if (pairs === 8) {
      setTimeout(() => {
        window.location.href = "win.html";
      }, 800);
    }

  } else {

    setTimeout(() => {
      firstCard.innerHTML = `<img src="winx/back.jpg">`;
      secondCard.innerHTML = `<img src="winx/back.jpg">`;

      resetTurn();
    }, 800);
  }
}

// reset
function resetTurn() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

// Rejouer
function restartGame() {
  location.reload();
}

// Accueil
function goHome() {
  window.location.href = "index.html";
}