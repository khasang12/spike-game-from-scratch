import { Renderable } from '../../types/renderable'

export default class Text implements Renderable {
    private ctx: CanvasRenderingContext2D
    private text: string
    private x: number
    private y: number
    private color: string
    private size: number

    constructor(
        ctx: CanvasRenderingContext2D,
        text: string,
        x: number,
        y: number,
        color: string,
        size = 70
    ) {
        this.ctx = ctx
        this.text = text
        this.x = x
        this.y = y
        this.size = size
        this.color = color

        this.draw()
    }

    public draw(): void {
        this.ctx.fillStyle = this.color
        if (!this.size) this.ctx.font = 'bold 70px Arial'
        else this.ctx.font = 'bold ' + this.size + 'px Arial'

        if (this.text.length < 2) this.ctx.fillText(this.text, this.x, this.y)
        else if (this.text.length < 3) this.ctx.fillText(this.text, this.x - 20, this.y)
        else this.ctx.fillText(this.text, this.x - 40, this.y)
    }
}
