import { game } from '../core/GameCore'
import BaseScene from './BaseScene'

export default class SceneManager {
    private static instance: SceneManager
    private currentScene: BaseScene

    private constructor() {
        return
    }

    public static getInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager()
        }
        return SceneManager.instance
    }

    public getCurrentScene(): BaseScene {
        return this.currentScene
    }

    public loadScene(scene: BaseScene): void {
        // Unload the current scene if there is one
        if (this.currentScene) {
            this.currentScene.unload()
        }
        // Load the new scene
        this.currentScene = scene
        this.currentScene.load()
        game.renderer.setDepth(this.currentScene)
        game.renderer.draw()
    }
}
