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
        this.background = new Background(new Vector2D(0, 0))
        this.score = new GameScore(new Vector2D(0, 0))
        this.bird = new Bird('Ready', new Vector2D(0, 0))
        this.topSpikes = new TopSpike(new Vector2D(0, 0))
        this.botSpikes = new BotSpike(new Vector2D(0, 0))

        this.addObject(this.background, 0)
        this.addObject(this.score, 1)
        this.addObject(this.bird, 2)
        this.addObject(this.topSpikes, 3)
        this.addObject(this.botSpikes, 4)
    }

    public draw(): void {
        this.update()
        for (const [obj, _depth] of this.depths) {
            obj.render()
        }
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
