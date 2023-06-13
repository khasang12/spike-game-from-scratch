import { ctx, DIRECTIONS } from '../constants'
import BaseSpike from './BaseSpike'
import { game } from './GameManager'
//import { SpikeType } from '../types/side-spike'

const spikeImage = new Image()
spikeImage.src = 'assets/images/spike.png'

export default class SideSpike extends BaseSpike {
    constructor() {
        super()
        this.w = 69
        this.h = 116
        this.x = 70
        this.y = -70
    }

    public draw(): void {
        if (game.bird.getDirection() == DIRECTIONS.RIGHT) {
            this.x = 298
            ctx.drawImage(spikeImage, 0, 0, this.w, this.h, this.x, this.y, this.w / 2, this.h / 2)
        } else if (game.bird.getDirection() == DIRECTIONS.LEFT) {
            this.x = -22
            ctx.save()
            ctx.translate(0, this.y)
            ctx.scale(-1, 1)
            ctx.drawImage(spikeImage, 0, 0, this.w, this.h, -22, 0, this.w / 2, this.h / 2)
            ctx.restore()
        }
    }
    
    public update(): void {
        alert('Not implemented')
    }
}
