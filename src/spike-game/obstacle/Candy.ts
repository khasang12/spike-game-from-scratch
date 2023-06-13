import BaseGameObject from '../../engine/components/BaseGameObject'
import Sprite from '../../engine/components/sprite/Sprite'
import { game } from '../../engine/core/GameCore'
import Vector2D from '../../engine/utils/Vector2D'

const spikeImage = new Image()
spikeImage.src = 'assets/images/candy.png'

export default class Candy extends BaseGameObject {
    private sprite: Sprite
    constructor(pos: Vector2D) {
        super(pos)

        this.setW(118 / 3.2)
        this.setH(70 / 3.2)
        this.setX(70)
        this.setY(70)

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(spikeImage)
    }
    public draw(): void {
        game.renderer.drawImage(
            this.sprite.getSpriteImg(),
            this.getX(),
            this.getY(),
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
