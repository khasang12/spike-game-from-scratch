import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants'
import BaseGameObject from '../../engine/components/BaseGameObject'
import Sprite from '../../engine/components/sprite/Sprite'
import Vector2D from '../../engine/utils/Vector2D'

const bgImage = new Image()
bgImage.src = 'assets/images/background.png'

export default class Background extends BaseGameObject {
    private sprite: Sprite
    constructor(pos: Vector2D) {
        super(pos)

        this.setW(CANVAS_WIDTH)
        this.setH(CANVAS_HEIGHT)
        this.setX(CANVAS_WIDTH / 2 + 20)
        this.setY(CANVAS_WIDTH / 2 + 75)

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(bgImage)
    }
    public draw(): void {
        this.game.renderer.drawImage(
            bgImage,
            this.getX() - this.getW() / 2,
            this.getY() - this.getH() / 2,
            this.getW(),
            this.getH()
        )
    }
    public update(lastTime: number, deltaTime: number): void {
        return
    }
    public pause(): void {
        return
    }
}
