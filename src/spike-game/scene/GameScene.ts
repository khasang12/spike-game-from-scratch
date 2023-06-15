import { game } from '../../engine/core/GameCore'
import BaseScene from '../../engine/scene/BaseScene'
import Vector2D from '../../engine/utils/Vector2D'
import { spikeGame } from '../GameManager'
import Background from '../background/Background'
import Bird from '../player/Bird'
import BotSpike from '../obstacle/BotSpike'
import Candy from '../obstacle/Candy'
import SideSpike from '../obstacle/SideSpike'
import SpikesController from '../obstacle/SpikesController'
import TopSpike from '../obstacle/TopSpike'
import GameScore from '../score/GameScore'

export default class GameScene extends BaseScene {
    private bird: Bird
    private background: Background
    private topSpikes: TopSpike
    private botSpikes: BotSpike
    private sideSpikes: SpikesController
    private score: GameScore
    private candy: Candy

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    public getScore(): GameScore {
        return this.score
    }

    public load(): void {
        this.background = new Background(new Vector2D(0, 0))
        this.score = new GameScore(new Vector2D(0, 0))
        this.bird = new Bird('Game', new Vector2D(0, 0))
        this.topSpikes = new TopSpike(new Vector2D(0, 0))
        this.botSpikes = new BotSpike(new Vector2D(0, 0))
        this.sideSpikes = new SpikesController()
        this.candy = new Candy(new Vector2D(0, 0))

        this.addObject(this.background, 0)
        this.addObject(this.score, 1)
        this.addObject(this.bird, 2)
        this.addObject(this.topSpikes, 3)
        this.addObject(this.botSpikes, 4)
        this.addObject(this.sideSpikes, 5)
        this.addObject(this.candy, 6)

        this.bird.subscribeCollision()
    }

    public getBird(): Bird {
        return this.bird
    }

    public getCandy(): Candy {
        return this.candy
    }

    public getSpikes(): SideSpike[] {
        return this.sideSpikes.getSpikes()
    }

    public draw(): void {
        this.update()
        for (const [obj, _depth] of this.depths) {
            obj.render()
        }
    }

    public update(): void {
        if (game.inputManager.hasMouseBinding('LEFT')) {
            this.bird.flap(3.5)
        }
        game.inputManager.removeMouseBinding()
    }

    public unload(): void {
        spikeGame.getScore().score = this.getScore().getScore() + 3 * this.getScore().getCandy()
        spikeGame.getScore().bestScore = Math.max(
            spikeGame.getScore().bestScore,
            spikeGame.getScore().score
        )
        spikeGame.getScore().gamesPlayed++
        this.bird.setToggleActive(false)
        game.renderer.clear()
    }

    public updateScore(): void {
        this.getScore().increaseScore()
        spikeGame.getScore().score = this.getScore().getScore()
        this.sideSpikes.update()
        this.candy.update(this.sideSpikes.getSpikes().slice(-1)[0])
    }
}
