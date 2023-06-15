import { game } from '../core/GameCore'
import Vector2D from '../utils/Vector2D'
import BaseComponent from './BaseComponent'
import BaseObject from './BaseObject'

export default abstract class BaseGameObject extends BaseObject {
    private w: number
    private h: number
    private position: Vector2D
    private components: BaseComponent[]

    constructor(pos = new Vector2D(0, 0)) {
        super()
        this.components = []
        this.position = pos
        this.game = game
    }

    public getW() {
        return this.w
    }

    public getH() {
        return this.h
    }

    public setW(w: number) {
        this.w = w
    }

    public setH(h: number) {
        this.h = h
    }

    public getX() {
        return this.getPosition().getX()
    }

    public getY() {
        return this.getPosition().getY()
    }

    public setX(x: number) {
        this.setPosition(new Vector2D(x, this.getY()))
    }

    public setY(y: number) {
        this.setPosition(new Vector2D(this.getX(), y))
    }

    public abstract render(): void

    public setToggleActive(active: boolean) {
        // set all components from GameObject to "Active" Flag
        if (active && !this.isEnabled) {
            for (const key in this.components) {
                this.components[key].setToggleActive(true)
            }
            this.isEnabled = true
        } else if (!active && this.isEnabled) {
            for (const key in this.components) {
                this.components[key].setToggleActive(true)
            }
            this.isEnabled = false
        }
    }

    public setPosition(pos: Vector2D) {
        this.position = pos
    }

    public getPosition(): Vector2D {
        return this.position
    }

    public addComponent(component: BaseComponent) {
        this.components.push(component)
    }

    public onCollision(_event: number) {
        throw new Error('Method not implemented.')
    }
}
