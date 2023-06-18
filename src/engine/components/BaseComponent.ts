import GameCore from '../core/GameCore'
import BaseGameObject from './BaseGameObject'
import BaseObject from './BaseObject'

export default abstract class BaseComponent extends BaseObject {
    protected name: string
    protected gameObject: BaseGameObject
    protected game: GameCore
    
    constructor(gameObject: BaseGameObject) {
        super()
        this.gameObject = gameObject
        this.gameObject.addComponent(this)
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }

    public abstract render(): void

    public abstract update(deltaTime: number): void

    public abstract pause(deltaTime: number): void
}
