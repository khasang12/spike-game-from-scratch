import Vector2D from '../../utils/Vector2D'
import BaseComponent from '../BaseComponent'
import BaseGameObject from '../BaseGameObject'

export default class Oscillator extends BaseComponent {
    private freq: number
    private amplitude: number
    private phase: number
    private velocity: Vector2D
    private force: Vector2D

    constructor(gameObject: BaseGameObject) {
        super(gameObject)
        this.freq = 980
        this.amplitude = 0.5
        this.phase = 0
        this.velocity = new Vector2D(0, this.amplitude)
    }

    public update(deltaTime: number) {
        this.phase += (2 * Math.PI * this.freq * deltaTime) / 16 // phi = phi0 + omega*dt
        this.velocity.setY((this.amplitude * Math.sin(this.phase) * deltaTime) / 16) // calculate and return current oscillation value

        // pos(obj) += v
        this.gameObject.setPosition(
            Vector2D.add(this.gameObject.getPosition(), Vector2D.mul(this.velocity, deltaTime / 16))
        )
    }

    public draw() {
        return
    }

    public pause() {
        return
    }
}
