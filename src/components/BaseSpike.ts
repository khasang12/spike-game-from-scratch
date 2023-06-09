import { GameObject } from "../types/object"

export default class BaseSpike implements GameObject {
    protected w: number
    protected h: number
    protected x: number
    protected y: number
    getH() {
        return this.h
    }
    getW() {
        return this.w
    }
    setY(a: number) {
        this.y = a
    }
    getY() {
        return this.y
    }
    setX(a: number) {
        this.x = a
    }
    getX() {
        return this.x
    }
    draw() {
        alert('Not implemented')
    }
    update() {
        alert('Not implemented')
    }
}
