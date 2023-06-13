import { game } from '../../engine/core/GameCore'
import BaseScene from '../../engine/scene/BaseScene'
import Vector2D from '../../engine/utils/Vector2D'
import { spikeGame } from '../GameManager'
import Background from '../background/Background'
import Bird from '../bird/Bird'
import BotSpike from '../obstacle/BotSpike'
import Candy from '../obstacle/Candy'
import SideSpike from '../obstacle/SideSpike'
import TopSpike from '../obstacle/TopSpike'
import GameScore from '../score/GameScore'

export default class GameScene extends BaseScene {
    private bird: Bird
    private background: Background
    private topSpikes: TopSpike
    private botSpikes: BotSpike
    private sideSpike: SideSpike
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
        this.sideSpike = new SideSpike(new Vector2D(0, 0))
        this.candy = new Candy(new Vector2D(0, 0))
    }

    public draw(): void {
        if (game.inputManager.hasMouseBinding('LEFT')) {
            this.bird.flap()
        }
        game.inputManager.removeMouseBinding()
    }

    public update(): void {
        this.getScore().increaseScore()
    }

    public unload(): void {
        spikeGame.getScore().score = this.getScore().getScore()
        spikeGame.getScore().bestScore = Math.max(
            spikeGame.getScore().bestScore,
            spikeGame.getScore().score
        )
        spikeGame.getScore().gamesPlayed++
        this.bird.setToggleActive(false)
        game.renderer.clear()
    }
}
