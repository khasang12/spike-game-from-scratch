import { game } from '../../engine/core/GameCore'
import BaseScene from '../../engine/scene/BaseScene'
import Vector2D from '../../engine/utils/Vector2D'
import { GAME_STATUS } from '../../engine/utils/constants'
import Background from '../background/Background'
import Bird from '../bird/Bird'
import BotSpike from '../obstacle/BotSpike'
import TopSpike from '../obstacle/TopSpike'
import GameScore from '../score/GameScore'

export default class MainMenuScene extends BaseScene {
    private bird: Bird
    private background: Background
    private topSpikes: TopSpike
    private botSpikes: BotSpike
    private score: GameScore

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
    }

    public getScore(): GameScore {
        return this.score
    }

    public load(): void {
        this.background = new Background(new Vector2D(0, 0))
        this.score = new GameScore(new Vector2D(0, 0))
        this.bird = new Bird('Ready', new Vector2D(0, 0))
        this.topSpikes = new TopSpike(new Vector2D(0, 0))
        this.botSpikes = new BotSpike(new Vector2D(0, 0))
    }

    public draw(): void {
        if (game.inputManager.hasMouseBinding('LEFT')) {
            game.state = GAME_STATUS.RUNNING
        }
        game.inputManager.removeMouseBinding()
    }

    public update(): void {
        return
    }

    public unload(): void {
        this.bird.setToggleActive(false)
        game.renderer.clear()
    }
}
