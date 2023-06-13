import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx, DIRECTIONS, STATES } from '../constants'
import { game } from './GameManager'
import { GameObject } from '../types/object'
import { BaseBird } from './BaseBird'
import Collision from './Collision'

const birdImage1 = new Image()
birdImage1.src = 'assets/images/bird1.png'
const birdImage2 = new Image()
birdImage2.src = 'assets/images/bird2.png'

export default class Bird extends BaseBird implements GameObject {
    constructor() {
        super()
        this.w = 156
        this.h = 101
        this.x = CANVAS_WIDTH / 2 - 20
        this.y = CANVAS_HEIGHT / 2
        this.speed = 0
        this.jump = 3
        this.gravity = 0.15
        this.vx = 2
        this.image = birdImage2
        this.direction = DIRECTIONS.RIGHT
    }

    public draw() {
        
        if (this.direction == DIRECTIONS.RIGHT)
            ctx.drawImage(
                this.image,
                0,
                0,
                this.w,
                this.h,
                this.x,
                this.y,
                this.w / 3.2,
                this.h / 3.2
            )
        else if (this.direction == DIRECTIONS.LEFT) {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.scale(-1, 1) // Mirroring
            ctx.drawImage(this.image, 0, 0, this.w, this.h, 0 - 45, 0, this.w / 3.2, this.h / 3.2)
            ctx.restore()
        }
    }

    public update(deltaTime: number) {
        if (game.state.getCurrent() == STATES.READY) {
            this.y += (0.1 * deltaTime) / 16
            if (Math.abs(this.y - CANVAS_HEIGHT / 2) >= 10) {
                this.y = CANVAS_HEIGHT / 2
            }
        } else if (game.state.getCurrent() == STATES.OVER) {
            this.y = CANVAS_HEIGHT / 2 + 45
        } else {
            this.speed -= (this.gravity * deltaTime) / 16
            this.y -= (this.speed * deltaTime) / 16

            if (this.speed <= 0) this.image = birdImage1
            this.x += ((this.direction == DIRECTIONS.RIGHT ? this.vx : -this.vx) * deltaTime) / 16

            // Collision Check
            Collision.checkWallCollision()
            Collision.checkOutOfBounds()
            Collision.checkHitCandy()
            for (const x of game.sideSpikes.getSpikes()) {
                //Collision.drawBoundBox(x.getY())
                Collision.checkHitSpike(x.getY())
            }
        }
    }

    public flap = () => {
        this.speed = this.jump
        this.image = birdImage2
    }

    public reset = () => {
        this.x = CANVAS_WIDTH / 2 - 20
        this.y = CANVAS_HEIGHT / 2 - 50
        this.speed = 0
        this.direction = DIRECTIONS.RIGHT
    }
}
