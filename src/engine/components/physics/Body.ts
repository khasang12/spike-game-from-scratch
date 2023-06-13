import Vector2D from '../../utils/Vector2D'
import BaseComponent from '../BaseComponent'
import BaseGameObject from '../BaseGameObject'

export default class Body extends BaseComponent {
    private gravity: number
    private bounceRate: number
    private velocity: Vector2D
    private force: Vector2D

    constructor(gameObject: BaseGameObject) {
        super(gameObject)
        this.gravity = 0.15
        this.bounceRate = 5
        this.force = new Vector2D(0, 0)
        this.velocity = new Vector2D(3, 0)
    }

    public update(lastTime: number, deltaTime: number) {
        // vec(obj) += F
        this.velocity = Vector2D.add(
            this.velocity,
            Vector2D.mul(
                new Vector2D(this.force.getX(), this.force.getY() + this.gravity),
                deltaTime / 16
            )
        )
        // pos(obj) += v
        this.gameObject.setPosition(
            Vector2D.add(this.gameObject.getPosition(), Vector2D.mul(this.velocity, deltaTime / 16))
        )
    }

    public jump() {
        this.velocity.setY(-this.bounceRate)
    }

    public changeDirection() {
        this.velocity = Vector2D.mul(this.velocity, -1)
        this.velocity.setY(-1)
    }

    public draw() {
        return
    }

    public pause() {
        return
    }
}