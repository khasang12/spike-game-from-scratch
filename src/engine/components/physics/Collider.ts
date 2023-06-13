import Vector2D from '../../utils/Vector2D'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS } from '../../utils/constants'
import BaseComponent from '../BaseComponent'
import BaseGameObject from '../BaseGameObject'

export default class Collider extends BaseComponent {
    constructor(gameObject: BaseGameObject) {
        super(gameObject)
    }

    public draw(): void {
        return
    }

    public update(): void {
        return
    }

    public pause(): void {
        return
    }

    public checkWallCollision(direction: number): boolean {
        if (direction == DIRECTIONS.RIGHT)
            if (
                Math.floor(this.gameObject.getX()) >=
                CANVAS_WIDTH - Math.floor(this.gameObject.getW()) - 20
            ) {
                return true
            }

        if (direction == DIRECTIONS.LEFT)
            if (Math.floor(this.gameObject.getX()) <= 20) {
                return true
            }
        return false
    }

    public checkOutOfBounds = () => {
        if (
            this.gameObject.getY() < Math.floor(this.gameObject.getH()) + 40 ||
            this.gameObject.getY() > CANVAS_HEIGHT - Math.floor(this.gameObject.getH()) - 70
        )
            return true
        return false
    }

    private checkHitTriangle(triangle: [Vector2D, Vector2D, Vector2D]): boolean {
        // Compute the barycentric coordinates of the point with respect to the triangle
        const [v0, v1, v2] = triangle
        const denom =
            (v1.getY() - v2.getY()) * (v0.getX() - v2.getX()) +
            (v2.getX() - v1.getX()) * (v0.getY() - v2.getY())
        const barycentric1 =
            ((v1.getY() - v2.getY()) * (this.gameObject.getX() - v2.getX()) +
                (v2.getX() - v1.getX()) * (this.gameObject.getY() - v2.getY())) /
            denom
        const barycentric2 =
            ((v2.getY() - v0.getY()) * (this.gameObject.getX() - v2.getX()) +
                (v0.getX() - v2.getX()) * (this.gameObject.getY() - v2.getY())) /
            denom
        const barycentric3 = 1 - barycentric1 - barycentric2

        // Check if the point's barycentric coordinates are all positive, indicating that it is inside the triangle
        return barycentric1 >= 0 && barycentric2 >= 0 && barycentric3 >= 0
    }

    public checkHitRectangle = (obj2: BaseGameObject) => {
        const [bx, by] = [this.gameObject.getX(), this.gameObject.getY()]
        const [cx, cy, cw, ch] = [obj2.getX(), obj2.getY(), obj2.getW(), obj2.getH()]
        if (
            (bx >= cx && bx <= cx + cw - 90 && by >= cy - 20 && by <= cy + ch) ||
            (bx >= CANVAS_WIDTH - cx + 180 &&
                bx <= CANVAS_WIDTH - cx + 180 + cw &&
                by >= cy - 20 &&
                by <= cy + ch - 40)
        ) {
            return true
        }
        return false
    }

    // Debug: Draw Boundaries for Collision Detection
    public drawBoundBox(ctx: CanvasRenderingContext2D, sp: number, spike: BaseGameObject) {
        ctx.fillStyle = 'red'

        ctx.fillRect(0, sp + 12, 4, -4)
        ctx.fillRect(0, sp + spike.getH() / 2 - 18, 4, 4)
        ctx.fillRect(0 + spike.getW() / 3 - 2, sp + spike.getH() / 8 + 18, 4, -4)

        ctx.fillRect(CANVAS_WIDTH - 3, sp + spike.getH() / 2 - 18, 4, -4)
        ctx.fillRect(CANVAS_WIDTH - 3, sp + 12, 4, 4)
        ctx.fillRect(CANVAS_WIDTH - 3 - spike.getW() / 3.2, sp + spike.getH() / 8 + 18, 4, -4)

        ctx.fillStyle = 'green'

        ctx.fillRect(
            this.gameObject.getX() + this.gameObject.getW() / 3.2,
            this.gameObject.getY(),
            4,
            4
        )
        ctx.fillRect(
            this.gameObject.getX() + this.gameObject.getW() / 3.2,
            this.gameObject.getY() + this.gameObject.getH() / 3.1,
            4,
            -4
        )
        ctx.fillRect(this.gameObject.getX(), this.gameObject.getY(), 4, -4)
        ctx.fillRect(
            this.gameObject.getX(),
            this.gameObject.getY() + this.gameObject.getH() / 3.1,
            4,
            4
        )
    }
}
