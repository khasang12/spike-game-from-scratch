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
        this.background = new Background(new Vector2D(0, 0), 0)
        this.score = new GameScore(new Vector2D(0, 0), 1)
        this.bird = new Bird('Game', new Vector2D(0, 0), 2)
        this.topSpikes = new TopSpike(new Vector2D(0, 0), 3)
        this.botSpikes = new BotSpike(new Vector2D(0, 0), 4)
        this.sideSpikes = new SpikesController(5)
        this.candy = new Candy(new Vector2D(0, 0), 6)

        this.addObject(this.background)
        this.addObject(this.score)
        this.addObject(this.bird)
        this.addObject(this.topSpikes)
        this.addObject(this.botSpikes)
        for (const spike of this.sideSpikes.getSpikes()) this.addObject(spike)
        this.addObject(this.candy)

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

    public update(deltaTime: number): void {
        if (game.inputManager.hasMouseBinding('LEFT') && this.bird.getIsEnabled()) {
            this.bird.flap(3.5)
        }
        this.sideSpikes.genRandomSpikes()
        super.update(deltaTime)
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
        this.candy.updateCandyPosBySpike(this.sideSpikes.getSpikes().slice(-1)[0])
        this.getScore().increaseScore()
        spikeGame.getScore().score = this.getScore().getScore()
    }
}
