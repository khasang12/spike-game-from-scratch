export class BaseCandy {
    protected w: number
    protected h: number
    protected x: number
    protected y: number
    protected image: HTMLImageElement

    constructor() {
        if (this.constructor == BaseCandy) {
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

    public draw() {
        alert('Not implemented')
    }

    public update() {
        alert('Not implemented')
    }
}
