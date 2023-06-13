import BaseGameObject from '../../engine/components/BaseGameObject'
import Body from '../../engine/components/physics/Body'
import Collider from '../../engine/components/physics/Collider'
import Sprite from '../../engine/components/sprite/Sprite'
import Vector2D from '../../engine/utils/Vector2D'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS } from '../../engine/utils/constants'
import { spikeGame } from '../GameManager'

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
        if (this.collider.checkOutOfBounds() && this.name == 'Game') {
            spikeGame.game.over()
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
                spikeGame.updateScore()
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
                spikeGame.updateScore()
            }
        }
    }

    public flap = () => {
        this.sprite.setSpriteImg(birdImage1)
        this.physics.jump()
    }
}
