import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx, DIRECTIONS } from "../constants"
import { game } from "../game"
import { BirdType } from "../types/bird"

const birdImage1 = new Image()
birdImage1.src = 'assets/images/bird1.png'
const birdImage2 = new Image()
birdImage2.src = 'assets/images/bird2.png'

export default class Bird implements BirdType {
    w = 156
    h = 101
    x = CANVAS_WIDTH / 2 - 20
    y = CANVAS_HEIGHT / 2
    score = 10
    bestScore = 0
    gamesPlayed = 0
    speed = 0
    jump = 3
    gravity = 0.1
    vx = 3
    image = birdImage2
    direction = DIRECTIONS.RIGHT

    // Wall Collision: Change BIRD direction, Update SPIKE appearance and Update SCORE
    private checkWallCollision = () => {
        if (this.direction == DIRECTIONS.RIGHT)
            if (Math.floor(this.x) >= CANVAS_WIDTH - Math.floor(this.w / 3.2)) {
                this.direction = DIRECTIONS.LEFT
                this.score++
                game.spike.update()
                // increase spike
                if (this.score > 0 && this.score % 5 === 0) game.spike.length++
            }

        if (this.direction == DIRECTIONS.LEFT)
            if (Math.floor(this.x) <= 0) {
                this.direction = DIRECTIONS.RIGHT
                this.score++
                game.spike.update()
            }
    }

    // Upper && Lower Edge Collision: Game Over
    private checkOutOfBounds = () => {
        if (
            this.y < Math.floor(this.w / 3.2) ||
            this.y > CANVAS_HEIGHT - Math.floor(this.w / 3.2) - 50
        )
            this.gameOver()
    }

    // Utilities: Draw BoundBoxes for Spikes and Bird
    private drawBoundBox = (sp: number) => {
        ctx.fillStyle = 'red'

        ctx.fillRect(0, sp + 12, 4, -4)
        ctx.fillRect(0, sp + game.spike.h / 2 - 18, 4, 4)
        ctx.fillRect(0 + game.spike.w / 3 - 2, sp + game.spike.h / 8 + 18, 4, -4)

        ctx.fillRect(CANVAS_WIDTH - 3, sp + game.spike.h / 2 - 18, 4, -4)
        ctx.fillRect(CANVAS_WIDTH - 3, sp + 12, 4, 4)
        ctx.fillRect(CANVAS_WIDTH - 3 - game.spike.w / 3.2, sp + game.spike.h / 8 + 18, 4, -4)

        ctx.fillStyle = 'green'

        ctx.fillRect(game.bird.x + this.w / 3.2, game.bird.y, 4, 4)
        ctx.fillRect(game.bird.x + this.w / 3.2, game.bird.y + this.h / 3.1, 4, -4)
        ctx.fillRect(game.bird.x + this.w / 3.2, (game.bird.y + game.bird.y + this.h / 3.1)/2, 4, -4)
        ctx.fillRect(game.bird.x, game.bird.y, 4, -4)
        ctx.fillRect(game.bird.x, game.bird.y + this.h / 3.1, 4, 4)
        ctx.fillRect(game.bird.x, (game.bird.y + game.bird.y + this.h / 3.1) / 2, 4, 4)
    }

    // Utilities: Check a point is inside the triangle
    private checkInsideTriangle = (point: number[], triangle: number[][]) => {
        // Compute the barycentric coordinates of the point with respect to the triangle
        const [v0, v1, v2] = triangle
        const denom = (v1[1] - v2[1]) * (v0[0] - v2[0]) + (v2[0] - v1[0]) * (v0[1] - v2[1])
        const barycentric1 =
            ((v1[1] - v2[1]) * (point[0] - v2[0]) + (v2[0] - v1[0]) * (point[1] - v2[1])) / denom
        const barycentric2 =
            ((v2[1] - v0[1]) * (point[0] - v2[0]) + (v0[0] - v2[0]) * (point[1] - v2[1])) / denom
        const barycentric3 = 1 - barycentric1 - barycentric2

        // Check if the point's barycentric coordinates are all positive, indicating that it is inside the triangle
        return barycentric1 >= 0 && barycentric2 >= 0 && barycentric3 >= 0
    }

    // Spike Collision
    private checkHitSpike = (sp: number) => {
        let x1: number, x2: number, x3: number, y1: number, y2: number, y3: number
        if (this.direction == DIRECTIONS.RIGHT) {
            x1 = CANVAS_WIDTH - 3
            y1 = sp + 12
            x2 = CANVAS_WIDTH - 3
            y2 = sp + game.spike.h / 2 - 18
            x3 = CANVAS_WIDTH - 3 - game.spike.w / 3.2
            y3 = sp + game.spike.h / 8 + 18
            if (
                this.checkInsideTriangle(
                    [game.bird.x + this.w / 3.2, game.bird.y],
                    [
                        [x1, y1],
                        [x2, y2],
                        [x3, y3],
                    ]
                ) ||
                this.checkInsideTriangle(
                    [game.bird.x + this.w / 3.2, game.bird.y + this.h / 3.1],
                    [
                        [x1, y1],
                        [x2, y2],
                        [x3, y3],
                    ]
                ) ||
                this.checkInsideTriangle(
                    [game.bird.x + this.w / 3.2, (game.bird.y + game.bird.y + this.h / 3.1) / 2],
                    [
                        [x1, y1],
                        [x2, y2],
                        [x3, y3],
                    ]
                )
            )
                this.gameOver()
        } else {
            x1 = 0
            y1 = sp + 12
            x2 = 0
            y2 = sp + game.spike.h / 2 - 18
            x3 = 0 + game.spike.w / 3 - 2
            y3 = sp + game.spike.h / 8 + 18
            if (
                this.checkInsideTriangle(
                    [game.bird.x, game.bird.y],
                    [
                        [x1, y1],
                        [x2, y2],
                        [x3, y3],
                    ]
                ) ||
                this.checkInsideTriangle(
                    [game.bird.x, game.bird.y + this.h / 3.1],
                    [
                        [x1, y1],
                        [x2, y2],
                        [x3, y3],
                    ]
                ) ||
                this.checkInsideTriangle(
                    [game.bird.x, (game.bird.y + game.bird.y + this.h / 3.1)/2],
                    [
                        [x1, y1],
                        [x2, y2],
                        [x3, y3],
                    ]
                )
            )
                this.gameOver()
        }
    }

    // GameOver: Update BestScore, GamePlayed and Game State
    private gameOver = () => {
        game.states.current = game.states.OVER
        this.bestScore = Math.max(this.score, this.bestScore)
        this.gamesPlayed++
        this.reset()
    }

    public draw = () => {
        if (this.direction == DIRECTIONS.RIGHT)
            ctx.drawImage(this.image, 0, 0, this.w, this.h, this.x, this.y, this.w / 3.2, this.h / 3.2)
        else if (this.direction == DIRECTIONS.LEFT) {
            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.scale(-1, 1) // Mirroring
            ctx.drawImage(this.image, 0, 0, this.w, this.h, 0 - 45, 0, this.w / 3.2, this.h / 3.2)
            ctx.restore()
        }
    }

    public update = () => {
        if (game.states.current != game.states.GAME) {
            this.y += 0.1
            if (Math.abs(this.y - CANVAS_HEIGHT / 2) >= 10) {
                this.y = CANVAS_HEIGHT / 2
            }
        } else {
            this.speed -= this.gravity
            this.y -= this.speed
            if (this.speed <= 0) this.image = birdImage1
            this.x += this.direction == DIRECTIONS.RIGHT ? this.vx : -this.vx

            // Collision Check
            this.checkWallCollision()
            this.checkOutOfBounds()
            for (const x of game.spike.positions) {
                this.drawBoundBox(x)
                this.checkHitSpike(x)
            }
        }
    }

    public flap = () => {
        this.speed = this.jump
    }

    public reset = () => {
        this.x = CANVAS_WIDTH / 2 - 20
        this.y = CANVAS_HEIGHT / 2 - 50
        this.speed = 0
        this.direction = DIRECTIONS.RIGHT
    }
}
