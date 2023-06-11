export class BaseBird {
    protected w: number
    protected h: number
    protected x: number
    protected y: number
    protected speed: number
    protected jump: number
    protected gravity: number
    protected vx: number
    protected frame: number
    protected image: HTMLImageElement
    protected direction: number

    constructor() {
        if (this.constructor == BaseBird) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }
    
    public getX() {
        return this.x
    }

    public getY() {
        return this.y
    }

    public getW() {
        return this.w
    }

    public getH() {
        return this.h
    }

    public getFrame() {
        return this.frame
    }

    public setFrame(f: number) {
        this.frame = f
    }

    public getDirection() {
        return this.direction
    }

    public setDirection(a: number) {
        this.direction = a
    }
}
