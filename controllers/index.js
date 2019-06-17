const TeamController = require('./TeamController')
const PlayerController = require('./PlayerController')
const MovieController = require('./MovieController')
const UserController = require('./UserController')
const ReviewController = require('./ReviewContoller')

module.exports = {
    team: TeamController,
    player: PlayerController,
    movie:MovieController,
    user:UserController,
    review:ReviewController
}