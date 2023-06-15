import GameCore, { game } from '../engine/core/GameCore'
import { GAME_STATUS } from '../engine/utils/constants'
import { IScore } from '../types/score'
import GameOverScene from './scene/GameOverScene'
import GameScene from './scene/GameScene'
import MainMenuScene from './scene/MainMenuScene'

export default class SpikeGameManager extends GameCore {
    public game: GameCore
    private score: IScore
    private curState: number

    constructor() {
        super()
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

    public updateWallCollision(): void {
        const scene = <GameScene>game.sceneManager.getCurrentScene()
        scene.updateScore()
    }

    public start() {
        game.start(360, 480, new MainMenuScene(game.canvas.getCanvas()))
        this.update(Date.now())
    }

    public draw() {
        // State Pattern
        if (this.curState != game.state) {
            this.curState = game.state
            switch (game.state) {
                case GAME_STATUS.READY:
                    game.sceneManager.loadScene(new MainMenuScene(game.canvas.getCanvas()))
                    break
                case GAME_STATUS.RUNNING:
                    game.sceneManager.loadScene(new GameScene(game.canvas.getCanvas()))
                    break
                case GAME_STATUS.OVER:
                    game.sceneManager.loadScene(new GameOverScene(game.canvas.getCanvas()))
                    break
            }
        }
        game.sceneManager.getCurrentScene().draw()
        game.draw()
    }

    public update(lastTime: number) {
        const curTime = Date.now()
        game.update(curTime - lastTime)
        this.draw()
        lastTime = Date.now()
        requestAnimationFrame(() => this.update(lastTime))
    }
}

export const spikeGame = new SpikeGameManager()
