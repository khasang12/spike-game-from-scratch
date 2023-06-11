import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx, DIRECTIONS, STATES } from '../constants'
import { game } from './GameManager'
import { GameObject } from '../types/object'
import Collision from './Collision'

const birdImage1 = new Image()
birdImage1.src = 'assets/images/bird1.png'
const birdImage2 = new Image()
birdImage2.src = 'assets/images/bird2.png'

export class BaseBird {
    protected w: number
    protected h: number
    protected x: number
    protected y: number
    protected speed: number
    protected jump: number
    protected gravity: number
    protected vx: number
    protected frame: number
    protected image: HTMLImageElement
    protected direction: number
    constructor() {
        if (this.constructor == BaseBird) {
            throw new Error("Abstract classes can't be instantiated.")
        }
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

    public getFrame() {
        return this.frame
    }

    public setFrame(f: number) {
        this.frame = f
    }

    public getDirection() {
        return this.direction
    }

    public setDirection(a: number) {
        this.direction = a
    }
}

export default class Bird extends BaseBird implements GameObject {
    constructor() {
        super()
        this.w = 156
        this.h = 101
        this.x = CANVAS_WIDTH / 2 - 20
        this.y = CANVAS_HEIGHT / 2
        this.frame = 0
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

    public update() {
        if (game.state.current == STATES.READY) {
            this.y += 0.1
            if (Math.abs(this.y - CANVAS_HEIGHT / 2) >= 10) {
                this.y = CANVAS_HEIGHT / 2
            }
        } else if (game.state.current == STATES.OVER) {
            this.y = CANVAS_HEIGHT / 2 + 45
        } else {
            this.speed -= this.gravity
            this.y -= (this.speed * this.frame) / 16

            if (this.speed <= 0) this.image = birdImage1
            this.x += this.direction == DIRECTIONS.RIGHT ? this.vx : -this.vx

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
