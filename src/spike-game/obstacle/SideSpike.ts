import { CANVAS_WIDTH } from '../../constants'
import BaseGameObject from '../../engine/components/BaseGameObject'
import Oscillator from '../player/Oscillator'
import Sprite from '../../engine/sprite/Sprite'
import { game } from '../../engine/core/GameCore'
import Vector2D from '../../engine/utils/Vector2D'
import { COLLISION_CODE } from '../utils/constants'
import { Subscriber } from '../../types/subscriber'
import { spikeGame } from '../GameManager'

const spikeImage = new Image()
spikeImage.src = 'assets/images/spike_small.png'

export default class SideSpike extends BaseGameObject implements Subscriber {
    private sprite: Sprite
    private physics: Oscillator

    constructor(pos: Vector2D) {
        super(pos)

        this.setW(69 / 3.2)
        this.setH(116 / 3.2)
        this.setX(CANVAS_WIDTH - 2)
        this.setY(-70)

        this.physics = new Oscillator(this)

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(spikeImage)
    }

    public render(): void {
        if (this.getX() > 300) {
            game.renderer.drawImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
        } else
            game.renderer.drawMirrorLRImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
    }

    public update(_deltaTime: number): void {
        this.physics.reset()
    }

    public pause(): void {
        return
    }

    public onCollision(event: number) {
        if (event == COLLISION_CODE.SIDE_SPIKE) {
            spikeGame.game.over()
        }
    }
}
