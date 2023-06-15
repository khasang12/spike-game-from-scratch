import { Renderable } from '../../types/renderable'
import Vector2D from '../utils/Vector2D'
import Shape from './Shape'

export default class Triangle extends Shape implements Renderable {
    private points: Vector2D[]
    private color: string

    constructor(ctx: CanvasRenderingContext2D, points: Vector2D[], color: string, isDrawn = true) {
        super()
        this.ctx = ctx
        this.points = points
        this.color = color
        if (isDrawn) {
            this.draw()
        }
    }

    public getPoints(): Vector2D[] {
        return this.points
    }

    public draw(): void {
        const [a, b, c] = this.points
        this.ctx.beginPath()
        this.ctx.moveTo(a.getX(), a.getY())
        this.ctx.lineTo(b.getX(), b.getY())
        this.ctx.lineTo(c.getX(), c.getY())
        this.ctx.closePath()
        this.ctx.fillStyle = this.color
        this.ctx.stroke()
    }
}
