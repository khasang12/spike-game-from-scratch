import { game } from '../../engine/core/GameCore'
import Rectangle from '../../engine/renderer/Rectangle'
import BaseScene from '../../engine/scene/BaseScene'
import Vector2D from '../../engine/utils/Vector2D'
import { GAME_STATUS } from '../../engine/utils/constants'
import Background from '../background/Background'
import BotSpike from '../obstacle/BotSpike'
import TopSpike from '../obstacle/TopSpike'
import GameScore from '../score/GameScore'

export default class GameOverScene extends BaseScene {
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
        this.topSpikes = new TopSpike(new Vector2D(0, 0), 2)
        this.botSpikes = new BotSpike(new Vector2D(0, 0), 3)

        this.addObject(this.background)
        this.addObject(this.score)
        this.addObject(this.topSpikes)
        this.addObject(this.botSpikes)
    }

    public draw(): void {
        this.update()
        super.draw()
        for (const [obj, _depth] of this.depths) {
            obj.render()
        }
    }

    public update(): void {
        if (game.inputManager.hasMouseBinding('LEFT')) {
            const [x, y] = game.inputManager.getMousePosition()
            const isButtonClicked = Rectangle.isPointInRect(x, y, 50, 277, 262, 53)
            if (isButtonClicked) {
                game.state = GAME_STATUS.READY
            }
        }
        game.inputManager.removeMouseBinding()
    }

    public unload(): void {
        game.renderer.clear()
    }
}
