import Vector2D from '../../engine/utils/Vector2D'
import BaseComponent from '../../engine/components/BaseComponent'
import BaseGameObject from '../../engine/components/BaseGameObject'

export default class Oscillator extends BaseComponent {
    private freq: number
    private amplitude: number
    private phase: number
    private velocity: Vector2D

    constructor(gameObject: BaseGameObject) {
        super(gameObject)
        this.freq = 100        
        this.amplitude = 1
        this.phase = 0
        this.velocity = new Vector2D(0, this.amplitude)
    }

    public update(deltaTime: number) {
        // phi = phi0 + omega*dt, v = Asin(phi)
        this.phase += (2 * Math.PI * this.freq * deltaTime) / 16
        this.velocity.setY((this.amplitude * Math.sin(this.phase) * deltaTime) / 16)

        // pos(obj) += v
        this.gameObject.setPosition(
            Vector2D.add(this.gameObject.getPosition(), Vector2D.mul(this.velocity, deltaTime / 16))
        )
    }

    public reset() {
        this.freq = 100
        this.amplitude = 1
        this.phase = 0
        this.velocity = new Vector2D(0, this.amplitude)
    }

    public render() {
        return
    }

    public pause() {
        return
    }
}
