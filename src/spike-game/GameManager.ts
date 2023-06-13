import GameCore, { game } from '../engine/core/GameCore'
import { GAME_STATUS } from '../engine/utils/constants'
import { IScore } from '../types/score'
import GameOverScene from './scene/GameOverScene'
import GameScene from './scene/GameScene'
import MainMenuScene from './scene/MainMenuScene'

export default class SpikeGameManager {
    public game: GameCore
    private score: IScore
    private curState: number

    constructor() {
        this.game = game
        this.score = {
            score: 0,
            bestScore: 0,
            gamesPlayed: 0,
        }
        this.curState = GAME_STATUS.READY
    }

    public getScore(): IScore {
        return this.score
    }

    public updateCollision(): void {
        game.sceneManager.getCurrentScene().update()
    }

    public start() {
        game.start(360, 480, new MainMenuScene(game.canvas.getCanvas()))
    }

    public draw() {
        game.draw()
        if (this.curState != game.state) {
            this.curState = game.state
            switch (game.state) {
                case GAME_STATUS.READY:
                    this.game.sceneManager.loadScene(new MainMenuScene(game.canvas.getCanvas()))
                    break
                case GAME_STATUS.RUNNING:
                    this.game.sceneManager.loadScene(new GameScene(game.canvas.getCanvas()))
                    break
                case GAME_STATUS.OVER:
                    this.game.sceneManager.loadScene(new GameOverScene(game.canvas.getCanvas()))
                    break
            }
        }
        game.sceneManager.getCurrentScene().draw()
    }
    public update(curTime: number, deltaTime: number) {
        game.update(curTime, deltaTime)
    }
}

export const spikeGame = new SpikeGameManager()
