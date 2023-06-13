export default class Rectangle {
    public static draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ): void {
        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
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
