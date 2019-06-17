const mongoose = require('mongoose')

const Player = new mongoose.Schema({
    firstName:{type: String, default:''},
    lastName:{type: String, default:''},
    position:{type: String, default:''},
    age:{type: Number, default:''},
    team:{type: String, default:''}
})

module.exports = mongoose.model('Player', Player)