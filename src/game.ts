import Background from './components/Background'
import Bird from './components/Bird'
import { Candy } from './components/Candy'
import Collision from './components/Collision'
import Score from './components/Score'
import SpikesManager from './components/SpikesManager'
import StateController from './components/StateController'
import TopBotSpike from './components/TopBotSpike'
import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx } from './constants'
import { GameType } from './types/game'

class Game implements GameType {
    bird = new Bird()
    score = new Score()
    candy = new Candy()
    topBotSpikes = new TopBotSpike()
    sideSpikes = new SpikesManager()
    background = new Background()
    collision = new Collision()
    state = new StateController()

    public draw(): void {
        ctx.fillStyle = '#ebebeb'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.topBotSpikes.draw()
        this.state.drawStart()
        this.state.drawGame()
        this.state.drawEnd()
    }

    public update(): void {
        this.bird.update()
        document.addEventListener('click', function (e) {
            game.state.updateGameState(e)
        })
    }
}

export const game = new Game()

function loop(): void {
    game.draw()
    game.update()
    requestAnimationFrame(loop)
}

loop()
