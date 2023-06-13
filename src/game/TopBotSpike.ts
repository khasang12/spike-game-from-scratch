import { CANVAS_HEIGHT, ctx } from '../constants'
import BaseSpike from './BaseSpike'

const topSpikes = new Image()
topSpikes.src = 'assets/images/spikes.png'

export default class TopBotSpike extends BaseSpike {
    private topX
    private topY
    private botX
    private botY
    constructor() {
        super()
        this.w = 1080
        this.h = 218
        this.topX = 0
        this.topY = 0
        this.botX = 1080 / 3.2
        this.botY = CANVAS_HEIGHT
    }

    public draw() {
        ctx.drawImage(
            topSpikes,
            0,
            0,
            this.w,
            this.h,
            this.topX,
            this.topY,
            this.w / 3.2,
            this.h / 3.2
        )
        ctx.save()
        ctx.translate(0, 0)
        ctx.rotate((180 * Math.PI) / 180)
        ctx.drawImage(
            topSpikes,
            0,
            0,
            this.w,
            this.h,
            -this.botX,
            -this.botY,
            this.w / 3.2,
            this.h / 3.2
        )
        ctx.restore()
    }
    public update() {
        alert('Not implemented')
    }
}
