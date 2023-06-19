import SideSpike from './SideSpike'
import Vector2D from '../../engine/utils/Vector2D'
import { spikeGame } from '../GameManager'
import Sprite from '../../engine/sprite/Sprite'
import GameScene from '../scene/GameScene'
import { DIRECTIONS } from '../../constants'

export default class SpikesController {
    private length: number
    private spikes: SideSpike[]
    private sprite: Sprite
    private spikeDirection: number = DIRECTIONS.RIGHT

    constructor(depth = 0) {
        this.length = 3
        this.spikes = []
        for (let i = 0; i < this.length; i++) {
            this.spikes.push(new SideSpike(new Vector2D(0, 0), depth))
        }
    }

    public genRandom(): number {
        let u = 0,
            v = 0
        while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random()
        let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
        num = num / 10.0 + 0.5 // Translate to 0 -> 1
        if (num > 1 || num < 0) return this.genRandom() // resample between 0 and 1
        return num
    }

    public getSpikes() {
        return this.spikes
    }

    public genRandomSpikes(): void {
        const bucketSize = (380 - 90) / this.length
        const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
        const bird = gameScene.getBird()
        if (bird.getDirection() != this.spikeDirection) {
            const random = this.genRandom()
            this.spikeDirection = bird.getDirection()
            for (let i = 0; i < this.length; i++) {
                const random_y = random * bucketSize + bucketSize * i + 50 // 60-380 (available height range)
                // Bucket 0 -> i
                this.spikes[i].setY(random_y)
                if (this.spikes[i].getX() > 300) this.spikes[i].setX(-3)
                else this.spikes[i].setX(318)
            }
        }
    }

    public reset = () => {
        this.length = 3
        this.spikes = []
        for (let i = 0; i < this.length; i++) {
            this.spikes.push(new SideSpike(new Vector2D(0, 0)))
        }
    }

    public syncSpikes = () => {
        for (let i = 0; i < this.length; i++) {
            this.spikes[i] = new SideSpike(new Vector2D(0, 0))
        }
    }

    public pause(_deltaTime: number) {
        return
    }
}
