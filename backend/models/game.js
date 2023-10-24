const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    deck: {
        cards:{
            type: {},
            required: true
        }
    },
    playerOne: {
        type: {},
        required: false
    },
    playerTwo: {
        type: {},
        required: false
    },
    currentPlayer: {
        type: {},
        required: false,
    },
    currentDealer: {
        type: {},
        required: false,
    }, 
    crib: {
        type: [{}],
        required: false,
    },
    players: {
        type: [],
        required: false
    }
    
})

module.exports = new mongoose.model('Game', gameSchema)