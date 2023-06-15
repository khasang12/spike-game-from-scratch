import GameCore from '../core/GameCore'
import { game } from '../core/GameCore'

export default abstract class BaseObject {
    protected isActive: boolean
    protected isEnabled: boolean
    protected game: GameCore
    protected canvas: HTMLCanvasElement

    public constructor() {
        this.isEnabled = true
        this.isActive = true
        this.game = game
        this.canvas = game.canvas.getCanvas()
    }

    public getIsEnabled(): boolean {
        return this.isEnabled
    }

    public setToggleActive(isActive: boolean) {
        if (isActive && !this.isEnabled) {
            this.isEnabled = true
        } else if (!isActive && this.isEnabled) {
            this.isEnabled = false
        }
    }

    public reset(): void {
        return
    }
}
