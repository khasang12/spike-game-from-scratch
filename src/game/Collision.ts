import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS, ctx } from '../constants'
import { game } from './GameManager'

export default class Collision {
    public static checkCandyCollided = false
    
    // Wall Collision: Change BIRD direction, Update SPIKE appearance and Update SCORE
    public static checkWallCollision = () => {
        const curScore = game.score.getScore()
        if (game.bird.getDirection() == DIRECTIONS.RIGHT)
            if (Math.floor(game.bird.getX()) >= CANVAS_WIDTH - Math.floor(game.bird.getW() / 3.2)) {
                game.bird.setDirection(DIRECTIONS.LEFT)
                game.score.setScore(curScore + 1)
                game.sideSpikes.update()
                this.checkCandyCollided = false
            }

        if (game.bird.getDirection() == DIRECTIONS.LEFT)
            if (Math.floor(game.bird.getX()) <= 0) {
                game.bird.setDirection(DIRECTIONS.RIGHT)
                game.score.setScore(curScore + 1)
                game.sideSpikes.update()
                this.checkCandyCollided = false
            }
    }

    // Upper && Lower Edge Collision: Game Over
    public static checkOutOfBounds = () => {
        if (
            game.bird.getY() < Math.floor(game.bird.getW() / 3.2) ||
            game.bird.getY() > CANVAS_HEIGHT - Math.floor(game.bird.getW() / 3.2) - 50
        )
            game.score.gameOver()
    }

    // Utilities: Check a point is inside the triangle
    private static checkInsideTriangle = (point: number[], triangle: number[][]) => {
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
    public static checkHitSpike = (sp: number) => {
        const [x, y, h] = [game.bird.getX(), game.bird.getY(), 69]
        let pA: [number, number], pB: [number, number], pC: [number, number]
        if (game.bird.getDirection() == DIRECTIONS.RIGHT) {
            pA = [CANVAS_WIDTH - 3, sp + 12]
            pB = [CANVAS_WIDTH - 3, sp + h / 2 - 18]
            pC = [CANVAS_WIDTH - 3 - 69 / 3.2, sp + h / 8 + 18]
            if (
                this.checkInsideTriangle([x + game.bird.getW() / 3.2, y], [pA, pB, pC]) ||
                this.checkInsideTriangle(
                    [x + game.bird.getW() / 3.2, y + game.bird.getH() / 3.1],
                    [pA, pB, pC]
                ) ||
                this.checkInsideTriangle(
                    [x + game.bird.getW() / 3.2, (y + y + game.bird.getH() / 3.1) / 2],
                    [pA, pB, pC]
                )
            ){
                game.score.gameOver()
            }
                
        } else {
            pA = [0, sp + 12]
            pB = [0, sp + h / 2 - 18]
            pC = [0 + 69 / 3 - 2, sp + h / 8 + 18]
            if (
                this.checkInsideTriangle([x, y], [pA, pB, pC]) ||
                this.checkInsideTriangle([x, y + game.bird.getH() / 3.1], [pA, pB, pC]) ||
                this.checkInsideTriangle(
                    [x, (y + y + game.bird.getH() / 3.1) / 2],
                    [pA, pB, pC]
                )
            )
                game.score.gameOver()
        }
    }

    // Candy Collision
    public static checkHitCandy = () => {
        const [bx, by] = [game.bird.getX(), game.bird.getY()]
        const [cx, cy, cw, ch] = [
            game.candy.getX(),
            game.candy.getY(),
            game.candy.getW(),
            game.candy.getH(),
        ]
        if (
            (bx >= cx && bx <= cx + cw - 90 && by >= cy - 20 && by <= cy + ch) ||
            (bx >= CANVAS_WIDTH - cx + 180 &&
                bx <= CANVAS_WIDTH - cx + 180 + cw &&
                by >= cy - 20 &&
                by <= cy + ch - 40)
        ) {
            if (!this.checkCandyCollided) {
                this.checkCandyCollided = true
                game.candy.update()
            }
        }
    }

    // Debug: Draw Boundaries for Collision Detection
    public static drawBoundBox = (sp: number) => {
        ctx.fillStyle = 'red'

        ctx.fillRect(0, sp + 12, 4, -4)
        ctx.fillRect(0, sp + game.sideSpikes.getSpikes()[0].getH() / 2 - 18, 4, 4)
        ctx.fillRect(
            0 + game.sideSpikes.getSpikes()[0].getW() / 3 - 2,
            sp + game.sideSpikes.getSpikes()[0].getH() / 8 + 18,
            4,
            -4
        )

        ctx.fillRect(CANVAS_WIDTH - 3, sp + game.sideSpikes.getSpikes()[0].getH() / 2 - 18, 4, -4)
        ctx.fillRect(CANVAS_WIDTH - 3, sp + 12, 4, 4)
        ctx.fillRect(
            CANVAS_WIDTH - 3 - game.sideSpikes.getSpikes()[0].getW() / 3.2,
            sp + game.sideSpikes.getSpikes()[0].getH() / 8 + 18,
            4,
            -4
        )

        ctx.fillStyle = 'green'

        ctx.fillRect(game.bird.getX() + game.bird.getW() / 3.2, game.bird.getY(), 4, 4)
        ctx.fillRect(
            game.bird.getX() + game.bird.getW() / 3.2,
            game.bird.getY() + game.bird.getH() / 3.1,
            4,
            -4
        )
        ctx.fillRect(game.bird.getX(), game.bird.getY(), 4, -4)
        ctx.fillRect(game.bird.getX(), game.bird.getY() + game.bird.getH() / 3.1, 4, 4)

        ctx.fillStyle = 'yellow'
        ctx.fillRect(game.candy.getX() + game.candy.getW() / 3.2, game.candy.getY(), 4, 4)
        ctx.fillRect(
            game.candy.getX() + game.candy.getW() / 3.2,
            game.candy.getY() + game.candy.getH() / 3.1,
            4,
            -4
        )
        ctx.fillRect(game.candy.getX(), game.candy.getY(), 4, -4)
        ctx.fillRect(game.candy.getX(), game.candy.getY() + game.candy.getH() / 3.1, 4, 4)
    }
}
