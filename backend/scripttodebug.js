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

class Player{
    constructor(name, userId, sid, score, hand){
        this.name = name
        this.score = score
        this.hand = hand
        this. score= score
        this.userId = userId
        this.sid = sid
    }

    addCardToHand(card){
        this.hand.push(card)
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

const playerOne = new Player('Ben', 1, 123, 0, [])
const playerTwo = new Player('Mary', 2, 456, 0, [])
const gameDeck = new Deck()
playerOne.hand = [new Card('♣', '7', 7,7), new Card('♣', '8', 8,8), new Card('♣', '9', 9,9), new Card('♣', 'Q', 12,12), new Card('♣', 'J', 11,11)]
playerTwo.hand = [new Card('♣', '2', 2,2), new Card('♣', '3', 3,3), new Card('♣', '4', 4,4),new Card('♥', '2', 2,2),new Card('♣', 'K', 13,13)]

// gameDeck.shuffle()
// dealHand(gameDeck, playerOne, playerTwo)

function calculateRunPoints(hand){
    let sortOrderHand = hand.map((card) => card.sortOrder)
    let uniqueValsInHand = Array.from(new Set(sortOrderHand))
    uniqueValsInHand = uniqueValsInHand.sort((a,b) => a-b)
    let numberOfDupes = sortOrderHand.length - uniqueValsInHand.length
    let totalRunPoints = 0
    if(numberOfDupes > 0){
        console.log('dupes found')
        totalRunPoints = 0
        let allRunList = [uniqueValsInHand]
        let numberRange = []
        for(let i = 0; i < numberOfDupes; i++){
            numberRange.push(i)
        }
        for(let number of numberRange){
            let uniqueCopy = uniqueValsInHand
            allRunList.push(uniqueCopy)
        }
        console.log(allRunList)
        for(run of allRunList){
            let innerRunPoints = 1
            for(let i = 0; i < run.length; i++){
                if(i < run.length - 1){
                    if(run[i]+1 == run[i+1]){
                        innerRunPoints +=1
                    } else {
                        break
                    }
                }
            }
            if(innerRunPoints >=3){
                totalRunPoints += innerRunPoints
            }
        }
        return totalRunPoints

    } else {
        totalRunPoints = 1
        for(let i =0; i< uniqueValsInHand.length; i++){
            if(i < uniqueValsInHand.length - 1){
                if(uniqueValsInHand[i] + 1 == uniqueValsInHand[i+1]){
                    totalRunPoints += 1
                } else {
                    break
                }
            }
        }
        if(totalRunPoints < 3){
            totalRunPoints = 0
        }
        return totalRunPoints
    }
}