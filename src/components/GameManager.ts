import Bird from './Bird'
import { Candy } from './Candy'
import Score from './Score'
import SpikesManager from './SpikesManager'
import StateController from './StateController'
import TopBotSpike from './TopBotSpike'
import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx } from '../constants'
import { GameType } from '../types/game'

class Game implements GameType {
    bird = new Bird()
    score = new Score()
    candy = new Candy()
    topBotSpikes = new TopBotSpike()
    sideSpikes = new SpikesManager()
    state = new StateController()

    public draw(): void {
        ctx.fillStyle = '#ebebeb'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.topBotSpikes.draw()
        this.state.drawStart()
        this.state.drawGame()
        this.state.drawEnd()
    }

    public update(deltaTime: number): void {
        this.bird.update(deltaTime)
        document.addEventListener('click', function (e) {
            game.state.updateGameState(e)
        })
    }
}

export const game = new Game()
