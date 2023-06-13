import BaseCanvas from '../components/canvas/Canvas'
import BaseComponent from '../components/BaseComponent'
import InputManager from '../input/InputManager'
import { GAME_STATUS } from '../utils/constants'
import Renderer from '../renderer/Renderer'
import SceneManager from '../scene/SceneManager'
import BaseScene from '../scene/BaseScene'

export default class GameCore {
    private static instance: GameCore
    private components: BaseComponent[] = []
    public inputManager: InputManager
    public sceneManager: SceneManager
    public state: number
    public renderer: Renderer
    public canvas: BaseCanvas

    private constructor() {
        if (GameCore.instance != null) {
            return GameCore.instance
        }
        this.state = GAME_STATUS.READY
        this.canvas = BaseCanvas.getInstance()
        this.inputManager = InputManager.getInstance()
        this.sceneManager = SceneManager.getInstance()
        this.renderer = Renderer.getInstance(this.canvas.getCanvas())
        GameCore.instance = this
    }

    public static getInstance() {
        if (GameCore.instance == null) {
            GameCore.instance = new GameCore()
        }
        return GameCore.instance
    }

    public start(w: number, h: number, startScene: BaseScene) {
        this.canvas.start(w, h)
        this.inputManager.start()
        this.sceneManager.loadScene(startScene)
    }

    public draw() {
        this.clearCanvas(this.canvas.getCanvas())
        for (const component of this.components) {
            if (component.getIsEnabled()) {
                component.draw()
            }
        }
    }

    public update(deltaTime: number) {
        switch (this.state) {
            case GAME_STATUS.RUNNING:
                for (const component of this.components) {
                    if (component.getIsEnabled()) component.update(deltaTime)
                }
                break
            case GAME_STATUS.PAUSE:
                for (const component of this.components) {
                    if (component.getIsEnabled()) component.pause(deltaTime)
                }
                break
        }
    }

    public clearCanvas(canvas: HTMLCanvasElement) {
        const context = <CanvasRenderingContext2D>canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    public addComponent(component: BaseComponent) {
        this.components.push(component)
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

export const game = GameCore.getInstance()
