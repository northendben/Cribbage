class Card {
    constructor(suit,value,numericValue, sortOrder){
        this.suit = suit
        this.value = value
        this.numericValue = numericValue
        this.sortOrder = sortOrder
    }
}

class Deck {
    constructor(){
        const suits = ['♣', '♥', '♠', '♦']
        const values = ["A", "2", "3", "4", "5",
        "6", "7", "8", "9", "10", "J", "Q", "K"]
        const cardNumericValues = {
        "A": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 10,
        "Q": 10,
        "K": 10
        }
        const cardSortOrders = {
        "A": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13
        }
        this.cards = suits.flatMap((suit) => values.map(value => new Card(suit, value, cardNumericValues[value], cardSortOrders[value])))
    }

    count(){
        return this.cards.length
    }

    shuffle(){
        for(let shuffleCount = 0; shuffleCount < 3; shuffleCount ++){
            for(let i =0; i < this.cards.length; i++){
                let j = Math.floor(Math.random() * this.cards.length)
                let temp = this.cards[i]
                this.cards[i] = this.cards[j]
                this.cards[j] = temp
            }
        }
    }

    dealCard(){
        const card_to_deal = this.cards.pop(0)
        return card_to_deal
    }
}


function dealHand(gameDeck,playerOne,playerTwo){
    let count = 1
    while (count < 7){
        playerOne.addCardToHand(gameDeck.dealCard())
        playerTwo.addCardToHand(gameDeck.dealCard())
        count += 1
    }
}

function dealTurnCard(gameDeck){
    const turnCard = gameDeck.dealCard()
    return turnCard
}

module.exports = {Card: Card, Deck: Deck, dealHand: dealHand, dealTurnCard:dealTurnCard}