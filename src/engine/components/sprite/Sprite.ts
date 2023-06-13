import BaseComponent from '../BaseComponent'
import BaseGameObject from '../BaseGameObject'

export default class Sprite extends BaseComponent {
    private image: HTMLImageElement
    constructor(gameObject: BaseGameObject) {
        super(gameObject)
    }

    public setSpriteImg(image: HTMLImageElement) {
        this.image = image
    }

    public getSpriteImg(): HTMLImageElement {
        return this.image
    }

    public draw(): void {
        if (this.gameObject.getIsEnabled()) this.gameObject.draw()
    }

    public update(curTime: number, deltaTime: number): void {
        return
    }

    public pause(curTime: number, deltaTime: number): void {
        return
    }
}
