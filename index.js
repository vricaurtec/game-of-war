class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        const card = new Card(suits[i], ranks[j], j + 2);
        this.cards.push(card);
      }
    }

    this.shuffle();
  }

  shuffle() {
    const cards = this.cards;

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // [cards[i], cards[j]] = [cards[j], cards[i]]
      let temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  }
}

class GameOfWar {
  constructor() {
    this.p1 = [];
    this.p2 = [];
    this.pile = [];
    this.gameSetup();
  }

  gameSetup() {
    const gameDeck = new Deck();
    this.p1.push(...gameDeck.cards.splice(0, 26));
    this.p2.push(...gameDeck.cards);
  }

  war() {
    if (this.p1.length < 4 || this.p2.length < 4) {
      if (this.p1.length < 4) {
        // p1 loses
        console.log("Not enough P1", this.p1);
        this.p2.push(...this.p1.splice(0, this.p1.length), ...this.pile);
      } else {
        // p2 loses
        console.log("Not enough P2", this.p2);
        this.p1.push(...this.p2.splice(0, this.p2.length), ...this.pile);
      }
    } else {
      const p1WarCards = this.p1.splice(this.p1.length - 3, 3);
      const p2WarCards = this.p2.splice(this.p2.length - 3, 3);

      this.pile.push(...p1WarCards, ...p2WarCards);
    }
  }

  play() {
    while (this.p1.length > 0 && this.p2.length > 0) {
      const p1Card = this.p1.pop();
      const p2Card = this.p2.pop();

      if (p1Card.score === p2Card.score) {
        console.log("Time for war!");
        this.pile.push(p1Card, p2Card);
        this.war();
      } else if (p1Card.score > p2Card.score) {
        // console.log("Player 1 wins this round")
        this.p1.unshift(p2Card, p1Card, ...this.pile);
        this.pile.length = 0;
      } else {
        // console.log("Player 2 wins this round")
        this.p2.unshift(p1Card, p2Card, ...this.pile);
        this.pile.length = 0;
      }
    }

    if (this.p1.length > 0) {
      console.log(
        `Player 1 has won!!! They have ${this.p1.length} cards in their deck. P2 has ${this.p2.length}`
      );
    } else {
      console.log(
        `Player 2 has won!!! They have ${this.p2.length} cards in their deck. P1 has ${this.p1.length}`
      );
    }
  }
}

const myGame = new GameOfWar();
// console.log(myGame)
myGame.play();
