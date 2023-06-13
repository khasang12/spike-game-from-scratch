import BaseScene from '../scene/BaseScene'

export default class Renderer {
    private static instance: Renderer
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private depth: number

    protected constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
    }

    public static getInstance(canvas: HTMLCanvasElement): Renderer {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer(canvas)
        }
        return Renderer.instance
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    public draw(scene: BaseScene): void {
        scene.draw()
    }

    public drawRect(x: number, y: number, width: number, height: number, color: string): void {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, width, height)
    }

    public drawCircle(x: number, y: number, radius: number, color: string): void {
        const circle = new Path2D()
        circle.arc(x, y, radius, 0, 2 * Math.PI, false)
        this.ctx.fillStyle = color
        this.ctx.fill(circle)
        this.ctx.lineWidth = 10
        this.ctx.strokeStyle = color
        this.ctx.stroke(circle)
    }

    public drawText(text: string, x: number, y: number, color: string, size = 70): void {
        this.ctx.fillStyle = color
        if (!size)
            this.ctx.font = 'bold 70px Arial'
        else
            this.ctx.font = 'bold '+size+'px Arial'

        if (text.length < 2) this.ctx.fillText(text, x, y)
        else if (text.length < 3) this.ctx.fillText(text, x - 20, y)
        else this.ctx.fillText(text, x - 40, y)
    }

    public drawImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        if (width && height) {
            this.ctx.drawImage(image, x, y, width, height)
        } else {
            this.ctx.drawImage(image, x, y)
        }
    }

    public drawMirrorLRImage(
        image: HTMLImageElement,
        x: number,
        y: number,
        width?: number,
        height?: number
    ): void {
        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.scale(-1, 1)
        if (width && height) {
            this.ctx.drawImage(image, 0, 0, width, height, 0 - 45, 0, width, height)
        } else {
            this.ctx.drawImage(image, x, y)
        }
        this.ctx.restore()
    }
}
