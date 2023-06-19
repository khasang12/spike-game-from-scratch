import { game } from '../../engine/core/GameCore'
import BaseScene from '../../engine/scene/BaseScene'
import Vector2D from '../../engine/utils/Vector2D'
import { GAME_STATUS } from '../../engine/utils/constants'
import Background from '../background/Background'
import Bird from '../player/Bird'
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
        this.background = new Background(new Vector2D(0, 0), 0)
        this.score = new GameScore(new Vector2D(0, 0), 1)
        this.bird = new Bird('Ready', new Vector2D(0, 0), 2)
        this.topSpikes = new TopSpike(new Vector2D(0, 0), 3)
        this.botSpikes = new BotSpike(new Vector2D(0, 0), 4)

        this.addObject(this.background)
        this.addObject(this.score)
        this.addObject(this.bird)
        this.addObject(this.topSpikes)
        this.addObject(this.botSpikes)
    }

    public draw(): void {
        this.update()
        super.draw()
    }

    public update(): void {
        if (game.inputManager.hasMouseBinding('LEFT')) {
            game.state = GAME_STATUS.RUNNING
        }
        game.inputManager.removeMouseBinding()
    }

    public unload(): void {
        this.bird.setToggleActive(false)
        game.renderer.clear()
    }
}
