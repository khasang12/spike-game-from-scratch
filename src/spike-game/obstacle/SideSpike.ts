import { CANVAS_WIDTH } from '../../constants'
import BaseGameObject from '../../engine/components/BaseGameObject'
import Oscillator from '../../engine/components/physics/Oscillator'
import Sprite from '../../engine/components/sprite/Sprite'
import { game } from '../../engine/core/GameCore'
import Vector2D from '../../engine/utils/Vector2D'
import { COLLISION_CODE } from '../../engine/utils/constants'
import { Subscriber } from '../../types/subscriber'
import { spikeGame } from '../GameManager'
import { soundCollide } from '../game'

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

    public draw(): void {
        if (this.getX() > 300)
            game.renderer.drawImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
        else
            game.renderer.drawMirrorLRImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
    }

    public update(deltaTime: number): void {
        return
    }

    public pause(): void {
        return
    }

    public onCollision(event: number) {
        if (event == COLLISION_CODE.SIDE_SPIKE) {
            soundCollide.play()
            spikeGame.game.over()
        }
    }
}
