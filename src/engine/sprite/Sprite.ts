import BaseComponent from '../components/BaseComponent'
import BaseGameObject from '../components/BaseGameObject'

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

    public render(): void {
        if (this.gameObject.getIsEnabled()) {
            this.gameObject.render()
        }
    }

    public update(_deltaTime: number): void {
        return
    }

    public pause(_deltaTime: number): void {
        return
    }
}
