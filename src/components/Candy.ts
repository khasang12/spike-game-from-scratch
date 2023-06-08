import { CANVAS_WIDTH, DIRECTIONS, ctx } from '../constants'
import { game } from '../game'
import { GameObject } from '../types/object'

const candyImage = new Image()
candyImage.src = 'assets/images/candy.png'

export class BaseCandy {
    protected w: number
    protected h: number
    protected x: number
    protected y: number
    protected image: HTMLImageElement
    constructor() {
        if (this.constructor == BaseCandy) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }
}

export class Candy extends BaseCandy implements GameObject {
    constructor() {
        super()
        this.w = 118
        this.h = 70
        this.x = 0
        this.y = 0
    }
    public getX() {
        return this.x
    }
    public getY() {
        return this.y
    }
    public getW() {
        return this.w
    }
    public getH() {
        return this.h
    }
    public draw(): void {
        const spikes = game.sideSpikes.getSpikes()
        const lastSpike = spikes[2]
        if (lastSpike.y > 0 && !game.collision.checkCandyCollided) {
            if (game.bird.getDirection() == DIRECTIONS.LEFT) this.x = lastSpike.x - 50
            else this.x = CANVAS_WIDTH - (lastSpike.x + 10)
            this.y = lastSpike.y - 15
            ctx.drawImage(
                candyImage,
                0,
                0,
                this.w,
                this.h,
                this.x,
                this.y,
                this.w / 3.35,
                this.h / 3.35
            )
        }
    }
    public update(): void {
        game.score.updateCandy()
    }
}
