export default class Text {
    public static draw(
        ctx: CanvasRenderingContext2D,
        text: string,
        x: number,
        y: number,
        color: string,
        size = 70
    ): void {
        ctx.fillStyle = color
        if (!size) ctx.font = 'bold 70px Arial'
        else ctx.font = 'bold ' + size + 'px Arial'

        if (text.length < 2) ctx.fillText(text, x, y)
        else if (text.length < 3) ctx.fillText(text, x - 20, y)
        else ctx.fillText(text, x - 40, y)
    }
}
