import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS } from '../constants'
import { game } from '../game'

export default class Collision {
    public checkCandyCollided = false
    // Wall Collision: Change BIRD direction, Update SPIKE appearance and Update SCORE
    public checkWallCollision = () => {
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
    public checkOutOfBounds = () => {
        if (
            game.bird.getY() < Math.floor(game.bird.getW() / 3.2) ||
            game.bird.getY() > CANVAS_HEIGHT - Math.floor(game.bird.getW() / 3.2) - 50
        )
            game.score.gameOver()
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
    public checkHitSpike = (sp: number) => {
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
            )
                game.score.gameOver()
        } else {
            pA = [0, sp + 12]
            pB = [0, sp + h / 2 - 18]
            pC = [0 + 69 / 3 - 2, sp + h / 8 + 18]
            if (
                this.checkInsideTriangle([x, y], [pA, pB, pC]) ||
                this.checkInsideTriangle([x, y + game.bird.getH() / 3.1], [pA, pB, pC]) ||
                this.checkInsideTriangle(
                    [x, (game.bird.getY() + game.bird.getY() + game.bird.getH() / 3.1) / 2],
                    [pA, pB, pC]
                )
            )
                game.score.gameOver()
        }
    }

    // Candy Collision
    public checkHitCandy = () => {
        const [bx, by] = [game.bird.getX(), game.bird.getY()]
        const [cx, cy, cw, ch] = [
            game.candy.getX(),
            game.candy.getY(),
            game.candy.getW(),
            game.candy.getH(),
        ]
        if (bx >= cx && bx <= cx + cw - 80 && by >= cy && by <= cy + ch) {
            if (!this.checkCandyCollided) {
                this.checkCandyCollided = true
                game.candy.update()
            }
        }
    }
}
