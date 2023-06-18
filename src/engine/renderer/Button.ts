import { Renderable } from '../../types/renderable'
import Rectangle from './Rectangle'
import Text from './Text'

export default class Button implements Renderable {
    private ctx: CanvasRenderingContext2D
    private x: number
    private y: number
    private width: number
    private height: number
    private buttonColor: string
    private textColor: string
    private text: string

    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        buttonColor: string,
        textColor: string,
        text: string,
        isDrawn = true
    ) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.buttonColor = buttonColor
        this.textColor = textColor
        this.text = text

        if (isDrawn) {
            this.draw()
        }
    }

    public draw(): void {
        new Rectangle(this.ctx, this.x, this.y, this.width, this.height, true, this.buttonColor)
        new Text(
            this.ctx,
            this.text,
            this.x + this.width / 3,
            this.y + this.height / 3,
            this.textColor,
            30
        )
    }
}
