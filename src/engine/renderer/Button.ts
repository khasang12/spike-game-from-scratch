import Rectangle from './Rectangle'
import Text from './Text'

export default class Button {
    public static draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        buttonColor: string,
        textColor: string,
        text: string
    ): void {
        Rectangle.draw(ctx, x, y, width, height, buttonColor)
        Text.draw(ctx, text, x + width / 3, y + height / 3, textColor, 30)
    }
}
