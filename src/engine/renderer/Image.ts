import { Renderable } from '../../types/renderable'

export default class Image implements Renderable {
    private ctx: CanvasRenderingContext2D
    private image: HTMLImageElement
    private x: number
    private y: number
    private width: number
    private height: number
    private direction: number

    constructor(
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number,
        direction: number,
        isDrawn = true
    ) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.image = image
        this.width = width
        this.height = height
        this.direction = direction

        if (isDrawn) this.draw()
    }

    public draw(): void {
        if (this.direction == -1) {
            this.drawMirrorImage(this.ctx, this.image, this.x, this.y, this.width, this.height)
        } else {
            this.drawImage(this.ctx, this.image, this.x, this.y, this.width, this.height)
        }
    }

    public drawImage(
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width?: number,
        height?: number
    ): void {
        if (width && height) {
            ctx.drawImage(image, x, y, width, height)
        } else {
            ctx.drawImage(image, x, y)
        }
    }

    public drawMirrorImage(
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width?: number,
        height?: number
    ): void {
        ctx.save()
        ctx.translate(x, y)
        ctx.scale(-1, 1)
        if (width && height) {
            ctx.drawImage(image, 0, 0, width, height, 0 - 45, 0, width, height)
        } else {
            ctx.drawImage(image, x, y)
        }
        ctx.restore()
    }
}
