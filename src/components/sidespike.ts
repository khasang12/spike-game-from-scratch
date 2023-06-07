import { ctx, DIRECTIONS } from "../constants"
import { game } from "../game"
import { SideSpikeType } from "../types/side-spike"

const spikeImage = new Image()
spikeImage.src = 'assets/images/spike.png'

export default class SideSpike implements SideSpikeType {
    w = 69
    h = 116
    length = 3
    positions = new Array(length).fill(0)
    public update = () => {
        this.positions = []
        for (let i = 0; i < this.length; i++) {
            let random_y = Math.floor(Math.random() * 320) + 60 // 60-380 (available height range)
            if (i > 0)
                if (Math.sqrt(Math.pow(this.positions[i - 1], 2) - Math.pow(random_y, 2))<this.h / 2)
                    random_y = this.positions[i - 1] + this.h
            this.positions.push(random_y)
        }
    }
    public draw = () => {
        for (let i = 0; i < this.length; i++) {
            const p = this.positions[i]

            if (game.bird.direction == DIRECTIONS.RIGHT) {
                ctx.drawImage(
                    spikeImage,
                    0,
                    0,
                    this.w,
                    this.h,
                    298,
                    p,
                    this.w / 2,
                    this.h / 2
                )
            } else if (game.bird.direction == DIRECTIONS.LEFT) {
                ctx.save()
                ctx.translate(0, p)
                ctx.scale(-1, 1)
                ctx.drawImage(
                    spikeImage,
                    0,
                    0,
                    this.w,
                    this.h,
                    -22,
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
