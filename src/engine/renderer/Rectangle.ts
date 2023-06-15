import { Renderable } from '../../types/renderable'
import Shape from './Shape'

export default class Rectangle extends Shape implements Renderable {
    private x: number
    private y: number
    private width: number
    private height: number
    private color: string

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        isDrawn = true,
        color = 'white'
    ) {
        super()
        this.ctx = ctx
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height

        if (isDrawn) {
            this.draw()
        }
    }

    public getX() {
        return this.x
    }

    public getY() {
        return this.y
    }

    public getH() {
        return this.height
    }

    public getW() {
        return this.width
    }

    public draw(): void {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    public static isPointInRect(
        x: number,
        y: number,
        rx: number,
        ry: number,
        rz: number,
        rt: number
    ): boolean {
        return Math.abs(x - rx) <= rz && Math.abs(y - ry) <= rt
    }
}
