import BaseGameObject from '../../engine/components/BaseGameObject'
import Sprite from '../../engine/components/sprite/Sprite'
import { game } from '../../engine/core/GameCore'
import Vector2D from '../../engine/utils/Vector2D'
import { Subscriber } from '../../types/subscriber'

const spikesImage = new Image()
spikesImage.src = 'assets/images/spikes_small.png'

export default class TopSpike extends BaseGameObject implements Subscriber {
    private sprite: Sprite
    constructor(pos: Vector2D) {
        super(pos)

        this.setW(1080 / 3.3 - 7)
        this.setH(218 / 3.3)
        this.setX(20)
        this.setY(0)

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(spikesImage)
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

    public onCollision(event: number) {
        return
    }
}
