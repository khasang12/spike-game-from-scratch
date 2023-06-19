import BaseScene from '../scene/BaseScene'
import Circle from './Circle'
import Image from './Image'
import Rectangle from './Rectangle'
import Text from './Text'

export default class Renderer {
    private static instance: Renderer
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private readonly depth: BaseScene[]

    protected constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.depth = []
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
    }

    public static getInstance(canvas: HTMLCanvasElement): Renderer {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer(canvas)
        }
        return Renderer.instance
    }

    public setDepth(object: BaseScene) {
        this.depth.push(object)
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    public draw(): void {
        this.depth[0].draw()
        this.depth.pop()
    }

    // Command Pattern

    public drawRect(x: number, y: number, width: number, height: number, color: string): void {
        const shape = new Rectangle(this.ctx, x, y, width, height, color)
        shape.draw()
    }

    public drawCircle(x: number, y: number, radius: number, color: string): void {
        const shape = new Circle(this.ctx, x, y, radius, color)
        shape.draw()
    }

    public drawText(text: string, x: number, y: number, color: string, size = 70): void {
        const shape = new Text(this.ctx, text, x, y, color, size)
        shape.draw()
    }

    public drawImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        const shape = new Image(this.ctx, image, x, y, width, height, 1)
        shape.draw()
    }

    public drawMirrorLRImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        const shape = new Image(this.ctx, image, x, y, width, height, -1)
        shape.draw()
    }
}
