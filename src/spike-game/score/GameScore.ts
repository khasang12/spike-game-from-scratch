import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants'
import BaseGameObject from '../../engine/components/BaseGameObject'
import Sprite from '../../engine/sprite/Sprite'
import Vector2D from '../../engine/utils/Vector2D'
import { GAME_STATUS } from '../../engine/utils/constants'
import { spikeGame } from '../GameManager'

const bgImage = new Image()
bgImage.src = 'assets/images/background.png'
const scoreImage = new Image()
scoreImage.src = 'assets/images/points.png'
const dttsString = new Image()
dttsString.src = 'assets/images/dttsString.png'
const StringBEST = new Image()
StringBEST.src = 'assets/images/StringBEST.png'
const hitString = new Image()
hitString.src = 'assets/images/HitString.png'

export default class GameScore extends BaseGameObject {
    private sprite: Sprite
    private bestScore: number
    private gamesPlayed: number
    private candyCount: number
    private score: number

    constructor(pos: Vector2D) {
        super(pos)

        this.bestScore = 0
        this.gamesPlayed = 0
        this.candyCount = 0
        this.score = 0

        this.setX(CANVAS_WIDTH / 2 + 20)
        this.setY(CANVAS_HEIGHT / 2)

        this.sprite = new Sprite(this)
    }

    private drawStartScore(): void {
        const renderer = this.game.renderer
        renderer.drawImage(dttsString, 45, 75, 873 / 3.2, 240 / 3.2)
        renderer.drawImage(hitString, 125, 170, 111, 57)
        renderer.drawImage(StringBEST, 70, 327, 614 / 3.2, 155 / 3.2)
        renderer.drawText(spikeGame.getScore().bestScore.toString(), 287, 350, '#aaa', 30)
        renderer.drawText(spikeGame.getScore().gamesPlayed.toString(), 287, 377, '#aaa', 30)
    }

    private drawEndScore(): void {
        const renderer = this.game.renderer
        renderer.drawImage(dttsString, 45, 75, 873 / 3.2, 240 / 3.2)
        renderer.drawImage(scoreImage, 45, 180, 230 / 0.85, 150)

        const score = spikeGame.getScore().score + 3 * this.candyCount
        if (score < 10)
            renderer.drawText(spikeGame.getScore().score.toString(), 163, 235, 'white', 50)
        else if (score >= 10 && score < 100)
            renderer.drawText(spikeGame.getScore().score.toString(), 170, 235, 'white', 50)
        else if (score >= 100)
            renderer.drawText(spikeGame.getScore().score.toString(), 163, 235, 'white', 50)

        renderer.drawImage(StringBEST, 74, 350, 614 / 3.2, 155 / 3.2)
        renderer.drawText(spikeGame.getScore().bestScore.toString(), 287, 370, '#aaa', 30)
        renderer.drawText(spikeGame.getScore().gamesPlayed.toString(), 287, 397, '#aaa', 30)
    }

    private drawGameScore(): void {
        const renderer = this.game.renderer
        renderer.drawCircle(this.getX(), this.getY(), 65, 'white')

        if (this.score < 10)
            renderer.drawText(
                this.score.toString(),
                CANVAS_WIDTH / 2,
                CANVAS_HEIGHT / 2 + 28,
                '#ababab'
            )
        else if (this.score < 100)
            renderer.drawText(
                this.score.toString(),
                CANVAS_WIDTH / 2,
                CANVAS_HEIGHT / 2 + 28,
                '#ababab'
            )
        else if (this.score >= 100)
            renderer.drawText(
                this.score.toString(),
                CANVAS_WIDTH / 2 - 10,
                CANVAS_HEIGHT / 2 + 28,
                '#ababab'
            )
    }

    public render(): void {
        if (this.game.state === GAME_STATUS.READY) {
            this.drawStartScore()
        } else if (this.game.state === GAME_STATUS.RUNNING) {
            this.drawGameScore()
        } else {
            this.drawEndScore()
        }
    }

    public update(lastTime: number, deltaTime: number): void {
        return
    }

    public pause(): void {
        return
    }

    public increaseScore() {
        this.score += 1
    }

    public getScore() {
        return this.score
    }

    public updateCandy() {
        this.candyCount++
    }

    public getCandy() {
        return this.candyCount
    }

    public getBestScore() {
        return this.bestScore
    }

    public getGamesPlayed() {
        return this.gamesPlayed
    }
}
