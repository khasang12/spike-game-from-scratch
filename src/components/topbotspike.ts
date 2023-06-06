import { CANVAS_HEIGHT, ctx } from "../constants"
import { TopBotSpikeType } from "../types/topbotspike"

const topSpikes = new Image()
topSpikes.src = 'assets/images/spikes.png'

export class TopBotSpike implements TopBotSpikeType {
    w = 1080
    h = 218
    topX = 0
    topY = 0
    botX = 1080 / 3.2
    botY = CANVAS_HEIGHT

    public draw = () => {
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
}
