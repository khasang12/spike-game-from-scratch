import BaseComponent from '../components/BaseComponent'
import BaseGameObject from '../components/BaseGameObject'
import { Colliderable } from '../../types/collider'
import Rectangle from '../renderer/Rectangle'
import Triangle from '../renderer/Triangle'
import Vector2D from '../utils/Vector2D'

export default class Collider extends BaseComponent {
    constructor(gameObject: BaseGameObject) {
        super(gameObject)
    }

    public render(): void {
        return
    }

    public update(): void {
        return
    }

    public pause(): void {
        return
    }

    public checkCollision(c: Colliderable): boolean {
        if (c.object instanceof Rectangle) {
            return this.checkHitRectangle(c.object)
        } else if (c.object instanceof Triangle) {
            return this.checkHitTriangle(c.object)
        } else {
            throw new Error('Not Implemented')
        }
    }

    private checkHitRectangle = (rectangle: Rectangle) => {
        const [bx, by] = [this.gameObject.getX(), this.gameObject.getY()]
        const [cx, cy, cw, ch] = [rectangle.getX(), rectangle.getY(), rectangle.getW(), rectangle.getH()]
        if (Math.abs(cx - bx) <= cw && Math.abs(cy - by) <= ch) {
            return true
        }
        return false
    }

    private checkHitTriangle = (triangle: Triangle) => {
        const [x, y, w, h] = [
            this.gameObject.getX(),
            this.gameObject.getY(),
            this.gameObject.getW(),
            this.gameObject.getH(),
        ]
        const points = [
            new Vector2D(x + w, y),
            new Vector2D(x + w, y + h),
            new Vector2D(x + w, (y + y + h) / 2),
            new Vector2D(x, y),
            new Vector2D(x, y + h),
            new Vector2D(x, (y + y + h) / 2),
        ]
        for (const point of points) {
            if (this.checkHitTriangleUtils(point, triangle)) return true
        }
        return false
    }

    private checkHitTriangleUtils = (point: Vector2D, triangle: Triangle) => {
        // Compute the barycentric coordinates of the point with respect to the triangle
        const [v0, v1, v2] = triangle.getPoints()
        const denom =
            (v1.getY() - v2.getY()) * (v0.getX() - v2.getX()) +
            (v2.getX() - v1.getX()) * (v0.getY() - v2.getY())
        const barycentric1 =
            ((v1.getY() - v2.getY()) * (point.getX() - v2.getX()) +
                (v2.getX() - v1.getX()) * (point.getY() - v2.getY())) /
            denom
        const barycentric2 =
            ((v2.getY() - v0.getY()) * (point.getX() - v2.getX()) +
                (v0.getX() - v2.getX()) * (point.getY() - v2.getY())) /
            denom
        const barycentric3 = 1 - barycentric1 - barycentric2

        // Check if the point's barycentric coordinates are all positive, indicating that it is inside the triangle
        return barycentric1 >= 0 && barycentric2 >= 0 && barycentric3 >= 0
    }
}
