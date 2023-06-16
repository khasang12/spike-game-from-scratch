import SideSpike from './SideSpike'
import Vector2D from '../../engine/utils/Vector2D'
import { spikeGame } from '../GameManager'
import Sprite from '../../engine/sprite/Sprite'
import BaseGameObject from '../../engine/components/BaseGameObject'
import GameScene from '../scene/GameScene'
import { DIRECTIONS } from '../../constants'

export default class SpikesController extends BaseGameObject {
    private length: number
    private spikes: SideSpike[]
    private sprite: Sprite
    private spikeDirection: number = DIRECTIONS.RIGHT

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

    public render() {
        for (let i = 0; i < this.length; i++) {
            this.spikes[i].render()
        }
    }

    public update(deltaTime: number) {
        this.genRandomSpikes()
        for (let i = 0; i < this.length; i++) {
            this.spikes[i].update(deltaTime)
        }
    }

    private genRandomSpikes(): void {
        const bucketSize = (380 - 90) / this.length
        const gameScene = <GameScene>spikeGame.game.sceneManager.getCurrentScene()
        const bird = gameScene.getBird()
        if (bird.getDirection() != this.spikeDirection) {
            this.spikeDirection = bird.getDirection()
            if (spikeGame.getScore().score > 0 && spikeGame.getScore().score % 5 === 0) {
                this.spikeDirection = bird.getDirection()
                this.spikes.push(new SideSpike(new Vector2D(0, 0)))
                this.syncSpikes()
                this.length++
            }
            const random = Math.floor(this.genRandom())
            for (let i = 0; i < this.length; i++) {
                // Bucket 0 -> i
                const random_y = random * bucketSize + 100 + bucketSize * i // 60-380 (available height range)
                this.spikes[i].setY(random_y)
                if (this.spikes[i].getX() > 300) this.spikes[i].setX(-3)
                else this.spikes[i].setX(318)
                console.log(this.spikes[i].getY())
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
