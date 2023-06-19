import BaseGameObject from '../../engine/components/BaseGameObject'
import Collider from '../../engine/physics/Collider'
import Rectangle from '../../engine/renderer/Rectangle'
import Triangle from '../../engine/renderer/Triangle'
import Vector2D from '../../engine/utils/Vector2D'
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTIONS } from '../utils/constants'
import { spikeGame } from '../GameManager'
import GameScene from '../scene/GameScene'

export default class BirdCollider extends Collider {
    private collider: Collider

    constructor(gameObject: BaseGameObject) {
        super(gameObject)
        this.collider = new Collider(gameObject)
    }

    public checkWallCollision(direction: number): boolean {
        if (direction == DIRECTIONS.RIGHT)
            if (
                Math.floor(this.gameObject.getX()) >=
                CANVAS_WIDTH - Math.floor(this.gameObject.getW()) - 20
            ) {
                return true
            }

        if (direction == DIRECTIONS.LEFT)
            if (Math.floor(this.gameObject.getX()) <= 20) {
                return true
            }
        return false
    }

    public checkOutOfBounds = () => {
        if (
            this.gameObject.getY() < Math.floor(this.gameObject.getH()) + 40 ||
            this.gameObject.getY() > CANVAS_HEIGHT - Math.floor(this.gameObject.getH()) - 70
        )
            return true
        return false
    }

    public checkHitSpike = (direction: number, sp: number) => {
        const [sw, sh] = [69 / 3.2, 116 / 3.2]
        let pA: Vector2D, pB: Vector2D, pC: Vector2D
        if (direction == DIRECTIONS.RIGHT) {
            pA = new Vector2D(CANVAS_WIDTH - 3 - sw, sp)
            pB = new Vector2D(CANVAS_WIDTH - 3 - 2 * sw, sp + sh / 2)
            pC = new Vector2D(CANVAS_WIDTH - 3 - sw, sp + sh)
            const shape = new Triangle(spikeGame.game.canvas.getCtx(), [pA, pB, pC], 'white', false)
            if (this.checkCollision({ object: shape })) return true
        } else {
            pA = new Vector2D(0 + sw, sp)
            pB = new Vector2D(0 + sw, sp + sh)
            pC = new Vector2D(0 + 2 * sw, sp + sh / 2)
            const spike = new Triangle(spikeGame.game.canvas.getCtx(), [pA, pB, pC], 'white', false)
            if (this.checkCollision({ object: spike })) return true
        }
        return false
    }

    public checkHitCandy = () => {
        const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
        const candy = gameScene.getCandy()
        const candyBounds = new Rectangle(
            spikeGame.game.canvas.getCtx(),
            candy.getX(),
            candy.getY(),
            candy.getW(),
            candy.getH()
        )
        if (this.checkCollision({ object: candyBounds })) return true
        return false
    }
}
