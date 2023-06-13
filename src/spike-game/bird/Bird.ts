import BaseGameObject from '../../engine/components/BaseGameObject'
import Body from '../../engine/components/physics/Body'
import Collider from '../../engine/components/physics/Collider'
import Sprite from '../../engine/components/sprite/Sprite'
import Vector2D from '../../engine/utils/Vector2D'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS } from '../../engine/utils/constants'
import { spikeGame } from '../GameManager'
import GameScene from '../scene/GameScene'

const birdImage1 = new Image()
birdImage1.src = 'assets/images/bird1_small.png'
const birdImage2 = new Image()
birdImage2.src = 'assets/images/bird2_small.png'

export default class Bird extends BaseGameObject {
    private name: string
    private sprite: Sprite
    private direction: number
    private physics: Body
    private collider: Collider

    constructor(name: string, pos: Vector2D) {
        super(pos)
        this.setW(156 / 3.2)
        this.setH(101 / 3.2)
        this.setX(CANVAS_WIDTH / 2 - 20)
        this.setY(CANVAS_HEIGHT / 2)

        this.name = name
        this.direction = DIRECTIONS.RIGHT

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(birdImage2)

        this.physics = new Body(this)
        this.collider = new Collider(this)
    }

    public draw(): void {
        if (this.name == 'Game') {
            const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
            if (this.collider.checkOutOfBounds()) spikeGame.game.over()
            console.log(gameScene.getCandy().getY())
            if (this.collider.checkHitRectangle(gameScene.getCandy())) {
                console.log('hit candy')
            }
            for (const sp of gameScene.getSpikes()) {
                if (this.checkHitSpike(sp.getY())) {
                    console.log('hit spike')
                }
            }
        }

        if (this.direction == DIRECTIONS.RIGHT) {
            spikeGame.game.renderer.drawImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
            if (this.collider.checkWallCollision(this.direction) && this.name == 'Game') {
                this.direction = DIRECTIONS.LEFT
                this.physics.changeDirection()
                spikeGame.updateCollision()
            }
        } else if (this.direction == DIRECTIONS.LEFT) {
            spikeGame.game.renderer.drawMirrorLRImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
            if (this.collider.checkWallCollision(this.direction) && this.name == 'Game') {
                this.direction = DIRECTIONS.RIGHT
                this.physics.changeDirection()
                spikeGame.updateCollision()
            }
        }
    }

    public flap = () => {
        this.sprite.setSpriteImg(birdImage1)
        this.physics.jump()
    }

    public checkHitSpike = (sp: number) => {
        const [x, y, h] = [this.getX(), this.getY(), 69]
        let pA: Vector2D, pB: Vector2D, pC: Vector2D
        if (this.direction == DIRECTIONS.RIGHT) {
            pA = new Vector2D(CANVAS_WIDTH - 3, sp + 12)
            pB = new Vector2D(CANVAS_WIDTH - 3, sp + h / 2 - 18)
            pC = new Vector2D(CANVAS_WIDTH - 3 - 69 / 3.2, sp + h / 8 + 18)
            if (
                this.collider.checkHitTriangle(new Vector2D(x + this.getW() / 3.2, y), [
                    pA,
                    pB,
                    pC,
                ]) ||
                this.collider.checkHitTriangle(
                    new Vector2D(x + this.getW() / 3.2, y + this.getH() / 3.1),
                    [pA, pB, pC]
                ) ||
                this.collider.checkHitTriangle(
                    new Vector2D(x + this.getW() / 3.2, (y + y + this.getH() / 3.1) / 2),
                    [pA, pB, pC]
                )
            ) {
                return true
            }
        } else {
            pA = new Vector2D(0, sp + 12)
            pB = new Vector2D(0, sp + h / 2 - 18)
            pC = new Vector2D(0 + 69 / 3 - 2, sp + h / 8 + 18)
            if (
                this.collider.checkHitTriangle(new Vector2D(x, y), [pA, pB, pC]) ||
                this.collider.checkHitTriangle(new Vector2D(x, y + this.getH() / 3.1), [pA, pB, pC]) ||
                this.collider.checkHitTriangle(new Vector2D(x, (y + y + this.getH() / 3.1) / 2), [pA, pB, pC])
            )
                return true
        }
        return false
    }
}
