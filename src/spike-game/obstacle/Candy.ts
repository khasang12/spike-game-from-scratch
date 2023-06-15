import BaseGameObject from '../../engine/components/BaseGameObject'
import Oscillator from '../../engine/components/physics/Oscillator'
import Sprite from '../../engine/components/sprite/Sprite'
import { game } from '../../engine/core/GameCore'
import Vector2D from '../../engine/utils/Vector2D'
import { COLLISION_CODE } from '../../engine/utils/constants'
import { Subscriber } from '../../types/subscriber'
import { spikeGame } from '../GameManager'
import { soundCandy } from '../game'
import GameScene from '../scene/GameScene'
import SideSpike from './SideSpike'

const spikeImage = new Image()
spikeImage.src = 'assets/images/candy.png'

export default class Candy extends BaseGameObject implements Subscriber {
    private sprite: Sprite
    private oscillator: Oscillator

    constructor(pos: Vector2D) {
        super(pos)

        this.setW(118 / 3.2)
        this.setH(70 / 3.2)
        this.setX(70)
        this.setY(-70)

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(spikeImage)

        this.oscillator = new Oscillator(this)
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

    public update(spike: SideSpike): void {
        this.setY(spike.getY() - 20)
        if (spike.getX() > 300) this.setX(spike.getX() - 40)
        else this.setX(spike.getX() + 45)
    }

    public pause(): void {
        return
    }

    public onCollision(event: number) {
        if (event == COLLISION_CODE.CANDY) {
            const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
            soundCandy.play()
            gameScene.getScore().updateCandy()
            gameScene.getCandy().setToggleActive(false)
        }
    }
}
