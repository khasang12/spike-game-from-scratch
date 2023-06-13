export default class Circle {
    public static draw(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void {
        const circle = new Path2D()
        circle.arc(x, y, radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = color
        ctx.fill(circle)
        ctx.lineWidth = 10
        ctx.strokeStyle = color
        ctx.stroke(circle)
    }
}
