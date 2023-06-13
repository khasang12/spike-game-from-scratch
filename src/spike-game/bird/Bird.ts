import BaseGameObject from '../../engine/components/BaseGameObject'
import Body from '../../engine/components/physics/Body'
import Collider from '../../engine/components/physics/Collider'
import Sound from '../../engine/components/sound/Sound'
import Sprite from '../../engine/components/sprite/Sprite'
import Vector2D from '../../engine/utils/Vector2D'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS } from '../../engine/utils/constants'
import { spikeGame } from '../GameManager'
import GameScene from '../scene/GameScene'

const birdImage1 = new Image()
birdImage1.src = 'assets/images/bird1_small.png'
const birdImage2 = new Image()
birdImage2.src = 'assets/images/bird2_small.png'

const soundFlap = new Sound('assets/sounds/flap.wav')
const soundCandy = new Sound('assets/sounds/spikes.wav')
const soundCollide = new Sound('assets/sounds/lose1.wav')
const soundSide = new Sound('assets/sounds/side.wav')

export default class Bird extends BaseGameObject {
    public checkCandyCollided = false
    private name: string
    private sprite: Sprite
    private direction: number
    private physics: Body
    private collider: Collider
    private soundFlap: Sound
    private soundCandy: Sound
    private soundCollide: Sound

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
            if (this.collider.checkOutOfBounds()){
                soundCollide.play()
                spikeGame.game.over()
            }
            if (
                this.collider.checkHitRectangle(gameScene.getCandy()) &&
                gameScene.getCandy().getIsEnabled()
            ) {
                soundCandy.play()
                gameScene.getScore().updateCandy()
                gameScene.getCandy().setToggleActive(false)
            }
            for (const sp of gameScene.getSpikes()) {
                if (this.checkHitSpike(sp.getY())) {
                    soundCollide.play()
                    spikeGame.game.over()
                }
            }
        }
        this.handleChangeDirection()
        this.sprite.setSpriteImg(birdImage2)
    }

    private handleChangeDirection() {
        if (this.direction == DIRECTIONS.RIGHT) {
            spikeGame.game.renderer.drawImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
            if (this.collider.checkWallCollision(this.direction) && this.name == 'Game') {
                soundSide.play()
                this.direction = DIRECTIONS.LEFT
                this.physics.changeDirection()
                spikeGame.updateWallCollision()
                this.enableCandy()
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
                soundSide.play()
                this.direction = DIRECTIONS.RIGHT
                this.physics.changeDirection()
                spikeGame.updateWallCollision()
                this.enableCandy()
            }
        }
    }

    private enableCandy() {
        if (this.name == 'Game') {
            const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
            if (!gameScene.getCandy().getIsEnabled()) gameScene.getCandy().setToggleActive(true)
        }
    }

    public flap = () => {
        soundFlap.play()
        this.sprite.setSpriteImg(birdImage1)
        this.physics.jump()
    }

    public checkHitSpike = (sp: number) => {
        const [x, y, w, h] = [this.getX(), this.getY(), this.getW(), this.getH()]
        const [sw, sh] = [69 / 3.2, 116 / 3.2]
        let pA: Vector2D, pB: Vector2D, pC: Vector2D
        if (this.direction == DIRECTIONS.RIGHT) {
            pA = new Vector2D(CANVAS_WIDTH - 3 - sw, sp)
            pB = new Vector2D(CANVAS_WIDTH - 3 - 2 * sw, sp + sh / 2)
            pC = new Vector2D(CANVAS_WIDTH - 3 - sw, sp + sh)
            if (
                this.collider.checkHitTriangle(new Vector2D(x + this.getW(), y), [pA, pB, pC]) ||
                this.collider.checkHitTriangle(new Vector2D(x + w, y + h), [pA, pB, pC]) ||
                this.collider.checkHitTriangle(new Vector2D(x + w, (y + y + h) / 2), [pA, pB, pC])
            ) {
                return true
            }
        } else {
            pA = new Vector2D(0 + sw, sp)
            pB = new Vector2D(0 + sw, sp + sh)
            pC = new Vector2D(0 + 2 * sw, sp + sh / 2)
            if (
                this.collider.checkHitTriangle(new Vector2D(x, y), [pA, pB, pC]) ||
                this.collider.checkHitTriangle(new Vector2D(x, y + h), [pA, pB, pC]) ||
                this.collider.checkHitTriangle(new Vector2D(x, (y + y + h) / 2), [pA, pB, pC])
            )
                return true
        }
        return false
    }
}
