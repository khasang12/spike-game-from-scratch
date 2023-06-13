import SideSpike from './SideSpike'
import Vector2D from '../../engine/utils/Vector2D'
import { spikeGame } from '../GameManager'
import Sprite from '../../engine/components/sprite/Sprite'
import BaseGameObject from '../../engine/components/BaseGameObject'

export default class SpikesController extends BaseGameObject {
    private length: number
    private spikes: SideSpike[]
    private sprite: Sprite
    constructor() {
        super()
        this.length = 3
        this.spikes = []
        for (let i = 0; i < this.length; i++) {
            this.spikes.push(new SideSpike(new Vector2D(0, 0)))
        }
        this.sprite = new Sprite(this)
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

    public draw() {
        for (let i = 0; i < this.length; i++) {
            this.spikes[i].draw()
        }
    }

    public update() {
        if (spikeGame.getScore().score > 0 && spikeGame.getScore().score % 5 === 0) {
            console.log(1111)
            this.spikes.push(new SideSpike(new Vector2D(0, 0)))
            this.length++
        }

        const bucketSize = (380 - 90) / this.length
        for (let i = 0; i < this.length; i++) {
            // Bucket 0 -> i
            const random_y = Math.floor(this.genRandom() * bucketSize + 80 + bucketSize * i) // 60-380 (available height range)
            if (random_y >= 90 && random_y < 380) {
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
}
