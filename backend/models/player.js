class Player{
    constructor(name, sid, score, hand, dbId){
        this.name = name
        this.sid = sid
        this.score = score
        this.hand = hand
        this.dbId = dbId
    }

    addCardToHand(card){
        this.hand.push(card)
    }
}

module.exports = Player