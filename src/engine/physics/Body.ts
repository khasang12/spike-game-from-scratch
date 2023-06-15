import Vector2D from '../utils/Vector2D'
import BaseComponent from '../components/BaseComponent'
import BaseGameObject from '../components/BaseGameObject'

export default class Body extends BaseComponent {
    private gravity: number
    private velocity: Vector2D
    private force: Vector2D

    constructor(gameObject: BaseGameObject, velocity = new Vector2D(0, 0)) {
        super(gameObject)
        this.gravity = 0.2
        this.force = new Vector2D(0, 0)
        this.velocity = velocity
    }

    public update(deltaTime: number) {
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

    public getVelocity(): Vector2D {
        return this.velocity
    }

    public getVelocityX(): number {
        return this.velocity.getX()
    }

    public getVelocityY(): number {
        return this.velocity.getY()
    }

    public setVelocity(velocity: Vector2D) {
        this.velocity = velocity
    }

    public render() {
        return
    }

    public pause() {
        this.gravity = 0
        this.velocity = new Vector2D(0, 0)
    }
}
