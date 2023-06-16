import BaseCanvas from '../canvas/Canvas'
import InputManager from '../input/InputManager'
import { GAME_STATUS } from '../utils/constants'
import Renderer from '../renderer/Renderer'
import SceneManager from '../scene/SceneManager'
import BaseScene from '../scene/BaseScene'

export default class GameCore {
    private static instance: GameCore
    public inputManager: InputManager
    public sceneManager: SceneManager
    public state: number
    public renderer: Renderer
    public canvas: BaseCanvas

    constructor() {
        this.state = GAME_STATUS.READY
        this.canvas = BaseCanvas.getInstance()
        this.inputManager = InputManager.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.renderer = Renderer.getInstance(this.canvas.getCanvas())
    }

    public start(w: number, h: number, startScene: BaseScene) {
        this.canvas.start(w, h)
        this.inputManager.start()
        this.sceneManager.loadScene(startScene)
    }

    public draw() {
        this.clearCanvas(this.canvas.getCanvas())
        this.sceneManager.getCurrentScene().draw()
    }

    public update(deltaTime: number) {
        switch (this.state) {
            case GAME_STATUS.RUNNING:
                this.sceneManager.getCurrentScene().update(deltaTime)
                break
            case GAME_STATUS.PAUSE:
                this.sceneManager.getCurrentScene().pause(deltaTime)
                break
        }
        this.draw()
    }

    public clearCanvas(canvas: HTMLCanvasElement) {
        const context = <CanvasRenderingContext2D>canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    public pause() {
        this.state = GAME_STATUS.PAUSE
    }

    public over() {
        this.state = GAME_STATUS.OVER
    }

    public resume() {
        this.state = GAME_STATUS.RUNNING
    }
}

export const game = new GameCore()
