export default class Image {
    public static draw(
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number,
        direction: number
    ): void {
        if (direction == -1) {
            Image.drawMirrorImage(ctx, image, x, y, width, height)
        }
        else {
            Image.drawImage(ctx, image, x, y, width, height)
        }
    }

    public static drawImage(
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        if (width && height) {
            ctx.drawImage(image, x, y, width, height)
        } else {
            ctx.drawImage(image, x, y)
        }
    }

    public static drawMirrorImage(
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
