import Bird from './Bird'
import { Candy } from './Candy'
import Score from './Score'
import SpikesManager from './SpikesManager'
import StateController from './StateController'
import TopBotSpike from './TopBotSpike'
import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx } from '../constants'
import { GameType } from '../types/game'
import { BaseBird } from './BaseBird'
import { BaseCandy } from './BaseCandy'

// Singleton Pattern
class GameManager implements GameType {
    private static instance: GameManager
    public bird: BaseBird
    public score: Score
    public candy: BaseCandy
    public topBotSpikes: TopBotSpike
    public sideSpikes: SpikesManager
    public state: StateController
    
    private constructor() {
        this.bird = new Bird()
        this.score = new Score()
        this.candy = new Candy()
        this.topBotSpikes = new TopBotSpike()
        this.sideSpikes = new SpikesManager()
        this.state = new StateController()
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }
        return GameManager.instance
    }

    public draw(): void {
        ctx.fillStyle = '#ebebeb'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        this.topBotSpikes.draw()
        this.state.draw()
    }

    public update(deltaTime: number): void {
        this.bird.update(deltaTime)
        document.addEventListener('click', function (e) {
            game.state.updateGameState(e)
        })
    }
}

export const game = GameManager.getInstance()
