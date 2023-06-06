import { CANVAS_WIDTH, ctx, directions } from "../constants"
import { game } from "../game"
import { SideSpikeType } from "../types/sidespike"

const spikeImage = new Image()
spikeImage.src = 'assets/images/spike.png'

export class SideSpike implements SideSpikeType {
    w = 69
    h = 116
    lX = 0
    lY = 0
    hiddenLeft = 0
    hiddenRight = CANVAS_WIDTH
    length = 3
    positions = new Array(length).fill(0)
    public update = () => {
        this.positions = []
        for (let i = 0; i < this.length; i++) {
            let random_y = Math.floor(Math.random() * 320) + 60 // 60-380 (available height range)
            console.log(random_y);
            if (i > 0)
                if (Math.sqrt(Math.pow(this.positions[i - 1], 2) - Math.pow(random_y, 2))<this.h / 2)
                    random_y = this.positions[i - 1] + this.h;
            this.positions.push(random_y)
        }
    }
    public draw = () => {
        for (let i = 0; i < this.length; i++) {
            const p = this.positions[i]

            if (game.bird.direction == directions.RIGHT) {
                if (this.hiddenRight != CANVAS_WIDTH - 22) this.hiddenRight -= 1
                ctx.drawImage(
                    spikeImage,
                    0,
                    0,
                    this.w,
                    this.h,
                    this.hiddenRight,
                    p,
                    this.w / 2,
                    this.h / 2
                )
            } else if (game.bird.direction == directions.LEFT) {
                if (this.hiddenLeft != -22) this.hiddenLeft -= 1
                ctx.save()
                ctx.translate(this.lX, p)
                ctx.scale(-1, 1)
                ctx.drawImage(
                    spikeImage,
                    0,
                    0,
                    this.w,
                    this.h,
                    this.hiddenLeft,
                    0,
                    this.w / 2,
                    this.h / 2
                )
                ctx.restore()
            }
        }
    }
    public reset = () => {
        this.positions = []
        this.length = 3
    }
}
