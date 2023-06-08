import { ctx, DIRECTIONS } from '../constants'
import { game } from '../game'
//import { SpikeType } from '../types/side-spike'

const spikeImage = new Image()
spikeImage.src = 'assets/images/spike.png'

export class BaseSpike {
    w: number
    h: number
    x: number
    y: number
}

export default class SideSpike extends BaseSpike {
    constructor() {
        super()
        this.w = 69
        this.h = 116
        this.x = 70
        this.y = -70
    }
    public setY(y: number) {
        this.y = y
    }
    public getY() {
        return this.y
    }
    public getH() {
        return this.h
    }
    public getW() {
        return this.w
    }
    public draw = () => {
        if (game.bird.getDirection() == DIRECTIONS.RIGHT) {
            ctx.drawImage(spikeImage, 0, 0, this.w, this.h, 298, this.y, this.w / 2, this.h / 2)
        } else if (game.bird.getDirection() == DIRECTIONS.LEFT) {
            ctx.save()
            ctx.translate(0, this.y)
            ctx.scale(-1, 1)
            ctx.drawImage(spikeImage, 0, 0, this.w, this.h, -22, 0, this.w / 2, this.h / 2)
            ctx.restore()
        }
    }
}
