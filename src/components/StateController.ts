import { STATES, canvas, ctx } from '../constants'
import Background from './Background'
import Collision from './Collision'
import { game } from './GameManager'

export class BaseStateController {
    protected current: number
}

// State Pattern (Behavioral Pattern)

export default class StateController extends BaseStateController {
    private static instance: StateController
    constructor() {
        super()
        if (StateController.instance) {
            return StateController.instance
        }
        StateController.instance = this
        this.current = STATES.READY
    }

    public getCurrent() {
        return this.current
    }

    public setCurrent(cur: number) {
        this.current = cur
    }

    public updateGameState(e: MouseEvent): void {
        if (game.state.current == STATES.READY) {
            ReadyState.update()
        } else if (game.state.current == STATES.GAME) {
            GameState.update()
        } else {
            OverState.update(e)
        }
    }

    public draw(): void {
        if (game.state.current == STATES.READY) {
            ReadyState.draw()
        } else if (game.state.current == STATES.GAME) {
            GameState.draw()
        } else {
            OverState.draw()
        }
    }
}

export class ReadyState {
    public static update() {
        // Reset score and enter the game
        game.score.setScore(0)
        game.state.setCurrent(STATES.GAME)
    }

    public static draw() {
        Background.drawStart()
    }
}

export class GameState {
    public static update() {
        // Bird flaps after clicked
        game.bird.flap()
    }

    public static draw() {
        Background.drawGame()
    }
}

export class OverState {
    public static update(e: MouseEvent) {
        // Reset Bird and Spike States
        game.bird.reset()
        game.sideSpikes.reset()
        // Draw boundaries for "Restart" button
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const path = new Path2D()
        path.rect(70, 245, 200, 30)
        path.closePath()
        ctx.fillStyle = '#FFFFFF'
        ctx.fillStyle = 'rgba(225,225,225,0.5)'
        ctx.fill(path)
        // Only change state if user clicks the button
        if (ctx.isPointInPath(path, x, y)) {
            game.state.setCurrent(STATES.READY)
            game.score.reset()
            Collision.checkCandyCollided = false
        }
    }

    public static draw() {
        Background.drawEnd()
    }
}
