import BaseGameObject from '../../engine/components/BaseGameObject'
import Body from '../../engine/physics/Body'
import Oscillator from '../obstacle/Oscillator'
import Sprite from '../../engine/sprite/Sprite'
import Vector2D from '../../engine/utils/Vector2D'
import { CANVAS_HEIGHT, CANVAS_WIDTH, COLLISION_CODE, DIRECTIONS } from '../utils/constants'
import { Subscriber } from '../../types/subscriber'
import { spikeGame } from '../GameManager'
import { soundCollide, soundFlap, soundSide } from '../game'
import GameScene from '../scene/GameScene'
import BirdCollider from './BirdCollider'
import EventSystem from './EventSystem'

const birdImage1 = new Image()
birdImage1.src = 'assets/images/bird1_small.png'
const birdImage2 = new Image()
birdImage2.src = 'assets/images/bird2_small.png'
const birdFood = new Image()
birdFood.src = 'assets/images/bird_food.png'
const birdDead = new Image()
birdDead.src = 'assets/images/bird_dead.png'

export default class Bird extends BaseGameObject implements Subscriber {
    public checkCandyCollided = false
    private name: string
    private sprite: Sprite
    private direction: number
    private physics: Body
    private collider: BirdCollider
    private oscillator: Oscillator
    private eventSystem: EventSystem

    constructor(name: string, pos: Vector2D) {
        super(pos)
        this.setW(156 / 3.2)
        this.setH(101 / 3.2)
        this.setX(CANVAS_WIDTH / 2 - 20)
        this.setY(CANVAS_HEIGHT / 2)

        this.eventSystem = new EventSystem()

        this.name = name
        this.direction = DIRECTIONS.RIGHT

        this.sprite = new Sprite(this)
        this.sprite.setSpriteImg(birdImage2)

        this.oscillator = new Oscillator(this)

        this.physics = new Body(this, new Vector2D(2.5, 0))
        this.collider = new BirdCollider(this)
    }

    public getDirection(): number {
        return this.direction
    }

    public subscribeCollision(): void {
        const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
        this.eventSystem.subscribe(gameScene.getBird())
        this.eventSystem.subscribe(gameScene.getCandy())
        for (const spike of gameScene.getSpikes()) this.eventSystem.subscribe(spike)
    }

    public async update(deltaTime: number): Promise<void> {
        const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
        this.physics.update(deltaTime)
        if (this.collider.checkOutOfBounds()) {
            this.eventSystem.notify(COLLISION_CODE.TOP_BOT_SPIKE)
        }
        if (this.collider.checkHitCandy() && gameScene.getCandy().getIsEnabled()) {
            this.eventSystem.notify(COLLISION_CODE.CANDY)
            this.sprite.setSpriteImg(birdFood)
        }
        for (const sp of gameScene.getSpikes()) {
            if (this.collider.checkHitSpike(this.direction, sp.getY())) {
                soundCollide.play()
                await new Promise((resolve) => {
                    this.sprite.setSpriteImg(birdDead)
                    setTimeout(resolve, 500)
                    this.physics.pause()
                    this.setToggleActive(false)
                })
                this.eventSystem.notify(COLLISION_CODE.SIDE_SPIKE)
            }
        }
        this.sprite.setSpriteImg(birdImage2)
    }

    public render(): void {
        if (this.direction == DIRECTIONS.RIGHT) {
            spikeGame.game.renderer.drawImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
        } else {
            spikeGame.game.renderer.drawMirrorLRImage(
                this.sprite.getSpriteImg(),
                this.getX(),
                this.getY(),
                this.getW(),
                this.getH()
            )
        }

        this.checkChangeDirection()
    }

    private checkChangeDirection() {
        if (this.direction == DIRECTIONS.RIGHT) {
            if (this.collider.checkWallCollision(this.direction)) {
                this.direction = DIRECTIONS.LEFT
                this.eventSystem.notify(COLLISION_CODE.WALL)
            }
        } else if (this.direction == DIRECTIONS.LEFT) {
            if (this.collider.checkWallCollision(this.direction)) {
                this.direction = DIRECTIONS.RIGHT
                this.eventSystem.notify(COLLISION_CODE.WALL)
            }
        }
    }

    private enableCandy() {
        const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
        if (!gameScene.getCandy().getIsEnabled()) gameScene.getCandy().setToggleActive(true)
    }

    public flap = (bounceRate: number) => {
        this.sprite.setSpriteImg(birdImage1)
        soundFlap.play()
        this.physics.setVelocity(new Vector2D(this.physics.getVelocityX(), -bounceRate))
    }

    public changeDirection() {
        this.physics.setVelocity(Vector2D.mul(this.physics.getVelocity(), -1))
        this.physics.setVelocity(new Vector2D(this.physics.getVelocityX(), -1))
    }

    public onCollision(event: number): void {
        if (event == COLLISION_CODE.TOP_BOT_SPIKE) {
            soundCollide.play()
            spikeGame.game.over()
        } else if (event == COLLISION_CODE.WALL) {
            soundSide.play()
            this.changeDirection()
            spikeGame.updateWallCollision()
            this.enableCandy()
        }
    }

    public pause(_deltaTime: number) {
        return
    }
}
