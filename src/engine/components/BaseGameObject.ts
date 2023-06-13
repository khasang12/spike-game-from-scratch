import { game } from '../core/GameCore'
import Vector2D from '../utils/Vector2D'
import BaseComponent from './BaseComponent'
import BaseObject from './BaseObject'

export default abstract class BaseGameObject extends BaseObject {
    private initPosition: Vector2D // Position on canvas
    private position: Vector2D // Position on canvas
    private w: number
    private h: number
    private components: { [key: string]: BaseComponent }

    constructor(pos = new Vector2D(0, 0)) {
        super()
        this.initPosition = pos
        this.components = {}
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

    public abstract draw(): void

    public reset() {
        this.position = this.initPosition
    }

    public setToggleActive(active: boolean) {
        if (active && !this.isEnabled) {
            for (const key in this.components) {
                this.components[key].setToggleActive(true)
            }
            this.isEnabled = true
            this.onEnable()
        } else if (!active && this.isEnabled) {
            for (const key in this.components) {
                this.components[key].setToggleActive(true)
            }
            this.isEnabled = false
            this.onDisable()
        }
    }

    public setPosition(pos: Vector2D) {
        this.position = pos
    }

    public getPosition(): Vector2D {
        return this.position
    }

    public addComponent(component: BaseComponent) {
        this.components[component.getName()] = component
    }

    public getComponent(name: string) {
        return this.components[name]
    }
}
