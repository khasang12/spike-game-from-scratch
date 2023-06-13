import { GameObject } from '../types/object'

export default class BaseSpike implements GameObject {
    protected w: number
    protected h: number
    protected x: number
    protected y: number

    public getH() {
        return this.h
    }

    public getW() {
        return this.w
    }

    public setY(a: number) {
        this.y = a
    }

    public getY() {
        return this.y
    }

    public setX(a: number) {
        this.x = a
    }

    public getX() {
        return this.x
    }

    public draw() {
        alert('Not implemented')
    }

    public update() {
        alert('Not implemented')
    }
}
