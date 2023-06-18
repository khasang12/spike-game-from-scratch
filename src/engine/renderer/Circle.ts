import { Renderable } from '../../types/renderable'
import Shape from './Shape'

export default class Circle extends Shape implements Renderable {
    private x: number
    private y: number
    private radius: number
    private color: string

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        color: string,
        isDrawn = true
    ) {
        super()
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color

        if (isDrawn) this.draw()
    }

    public draw(): void {
        const circle = new Path2D()
        circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill(circle)
        this.ctx.lineWidth = 10
        this.ctx.strokeStyle = this.color
        this.ctx.stroke(circle)
    }
}
