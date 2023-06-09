import { STATES } from '../constants'
import { game } from './GameManager'
//import BaseScoreCounter from '../types/score'

export class BaseScoreCounter {
    protected score: number
    protected candyCount: number
    protected bestScore: number
    protected gamesPlayed: number
    constructor() {
        if (this.constructor == BaseScoreCounter) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }
}

export default class Score extends BaseScoreCounter {
    constructor() {
        super()
        this.bestScore = 0
        this.gamesPlayed = 0
        this.candyCount = 0
        this.score = 0
    }
    public setScore(a: number) {
        this.score = a
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

    public reset() {
        this.candyCount = 0
        this.score = 0
    }

    public gameOver() {
        game.state.current = STATES.OVER
        this.bestScore = Math.max(this.score + 3 * this.candyCount, this.bestScore)
        this.gamesPlayed++
        game.bird.reset()
    }
}
