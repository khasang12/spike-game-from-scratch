export default class Vector2D {
    private x
    private y

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public getX() {
        return this.x
    }

    public getY() {
        return this.y
    }

    public setX(x: number) {
        this.x = x
    }

    public setY(y: number) {
        this.y = y
    }

    public static add(v1: Vector2D, v2: Vector2D) {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y)
    }

    public static sub(v1: Vector2D, v2: Vector2D) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y)
    }

    public static mul(v: Vector2D, prd: number) {
        return new Vector2D(v.x * prd, v.y * prd)
    }

    public static distance(v1: Vector2D, v2: Vector2D) {
        return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2)
    }
}
